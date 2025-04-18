#!/usr/bin/env python3
"""
import_shopify_data.py: Fetch all collections and products from Shopify JSON endpoints and upsert to MongoDB.
"""
import os
import asyncio
import requests
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from .category import Category
from .product import Product

# Load env vars
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
STORE_URL = os.getenv("SHOPIFY_STORE_URL", "https://boredboardgames.com")

async def init_db():
    client = AsyncIOMotorClient(MONGO_URI)
    await init_beanie(
        database=client.get_default_database(),
        document_models=[Category, Product]
    )

def fetch_collections():
    url = f"{STORE_URL}/collections.json?limit=250"
    resp = requests.get(url)
    resp.raise_for_status()
    return resp.json().get("collections", [])


def fetch_products_in_collection(handle):
    url = f"{STORE_URL}/collections/{handle}/products.json?limit=250"
    resp = requests.get(url)
    resp.raise_for_status()
    return resp.json().get("products", [])


async def main():
    if not MONGO_URI:
        raise RuntimeError("MONGO_URI not set.")
    await init_db()

    # Upsert collections
    for col in fetch_collections():
        slug = col.get("handle")
        data = {
            "name": col.get("title"),
            "slug": slug,
            "description": col.get("body_html", ""),
            "tags": [],
            "image": col.get("image", {}).get("src", ""),
            "custom_url": None
        }
        db_cat = await Category.find_one(Category.slug == slug)
        if db_cat:
            for k, v in data.items(): setattr(db_cat, k, v)
            await db_cat.save()
            print(f"Updated collection {slug}")
        else:
            await Category(**data).insert()
            print(f"Inserted collection {slug}")

    # Upsert products by collection
    seen = set()
    for col in fetch_collections():
        slug = col.get("handle")
        for prod in fetch_products_in_collection(slug):
            handle = prod.get("handle")
            if handle in seen: continue
            seen.add(handle)
            variants = prod.get("variants", [])
            first = variants[0] if variants else {}
            price = float(first.get("price") or 0)
            sale_price = float(first.get("compare_at_price") or 0)
            images = [img.get("src") for img in prod.get("images", [])]
            data = {
                "name": prod.get("title"),
                "slug": handle,
                "description": prod.get("body_html", ""),
                "price": price,
                "sale_price": sale_price,
                "images": images,
                "tags": prod.get("tags", "").split(","),
                "categories": [slug],
                "sku": first.get("sku"),
                "inventory": first.get("inventory_quantity"),
                "specs": {},
                # Keep existing dropship fields or defaults
            }
            db_prod = await Product.find_one(Product.slug == handle)
            if db_prod:
                for k, v in data.items(): setattr(db_prod, k, v)
                await db_prod.save()
                print(f"Updated product {handle}")
            else:
                await Product(**data).insert()
                print(f"Inserted product {handle}")

if __name__ == '__main__':
    asyncio.run(main())
