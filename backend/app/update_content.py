"""
Script to scrape live site categories and products,
generate new SEO-friendly descriptions via OpenAI,
and update MongoDB documents accordingly.
"""
import os
import requests
import xml.etree.ElementTree as ET
import random
import asyncio
from dotenv import load_dotenv
import openai
from bs4 import BeautifulSoup
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie

from app.product import Product
from app.category import Category
from app.order import Order, OrderItem
from app.user import User
from app.settings import Settings

async def init_db():
    load_dotenv()
    uri = os.getenv("MONGO_URI")
    if not uri:
        raise RuntimeError("MONGO_URI not set.")
    client = AsyncIOMotorClient(uri)
    await init_beanie(
        database=client.get_default_database(),
        document_models=[Product, Category, Order, OrderItem, User, Settings]
    )

def fetch_sitemaps(base):
    ix = f"{base}/sitemap.xml"
    r = requests.get(ix); r.raise_for_status()
    root = ET.fromstring(r.text)
    ns = {'ns':'http://www.sitemaps.org/schemas/sitemap/0.9'}
    cats, prods = [], []
    for sm in root.findall('ns:sitemap', ns):
        loc = sm.find('ns:loc', ns).text
        if 'collections' in loc: cats.append(loc)
        if 'products' in loc: prods.append(loc)
    def urls(ms): lst=[]
    for m in ms:
        r = requests.get(m); r.raise_for_status(); rr = ET.fromstring(r.text)
        for u in rr.findall('ns:url', ns): lst.append(u.find('ns:loc', ns).text)
    return {'categories':urls(cats), 'products':urls(prods)}

def slug_of(u): return u.rstrip('/').split('/')[-1]

def gen_cat_desc(name, links):
    prompt = (
        f"Write a 2-3 sentence engaging category intro for '{name}' on Bored Board Games."
        " Start with 'Don't be bored, play a board game', emphasize disconnecting from screens, playing with friends, hand-eye coordination, and fun, and include links: "
        + ", ".join(links)
    )
    r = openai.Completion.create(model="text-davinci-003", prompt=prompt, max_tokens=100, temperature=0.7)
    return r.choices[0].text.strip()

def gen_prod_desc(name, raw):
    prompt = (
        f"Rewrite the product description for '{name}' to be playful and on-brand for Bored Board Games."
        " Emphasize disconnecting from digital, playing together, hand-eye coordination, and screen-free fun."
        f" Original: {raw}"
    )
    r = openai.Completion.create(model="text-davinci-003", prompt=prompt, max_tokens=150, temperature=0.7)
    return r.choices[0].text.strip()

async def main():
    load_dotenv()
    key = os.getenv("OPENAI_API_KEY")
    if not key: raise RuntimeError("OPENAI_API_KEY not set.")
    openai.api_key = key
    await init_db()
    base = os.getenv("LIVE_SITE_URL","https://boredboardgames.com")
    maps = fetch_sitemaps(base)
    cats = maps['categories']
    slugs = [slug_of(u) for u in cats]
    names = [s.replace('-',' ').title() for s in slugs]
    links = [f"<a href='/collections/{s}'>{n}</a>" for s,n in zip(slugs,names)]
    for u in cats:
        s = slug_of(u); n = s.replace('-',' ').title()
        related = random.sample([l for l in links if s not in l], min(2,len(links)-1))
        desc = gen_cat_desc(n, related)
        c = await Category.find_one(Category.slug==s)
        if c: c.description=desc; await c.save(); print(f"Cat {s} done")
    for u in maps['products']:
        s = slug_of(u)
        r = requests.get(u); r.raise_for_status()
        soup = BeautifulSoup(r.text,'html.parser')
        raw = ''
        d = soup.find(class_='product-single__description') or soup.find(id='product-description')
        raw = d.get_text(' ').strip() if d else ''
        h = soup.find('h1'); n = h.get_text().strip() if h else s.replace('-',' ').title()
        d2 = gen_prod_desc(n, raw)
        p = await Product.find_one(Product.slug==s)
        if p: p.description=d2; await p.save(); print(f"Prod {s} done")

if __name__ == '__main__':
    asyncio.run(main())
