#!/usr/bin/env python3
"""
import_all_data.py: Fetch all categories and products from live site via Shopify JSON API and upsert to MongoDB without altering existing descriptions.
"""
import os
from dotenv import load_dotenv  # load .env variables
load_dotenv()
import asyncio
import requests
import json
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie

from .category import Category
from .product import Product

BASE_URL = os.getenv("LIVE_SITE_URL", "https://boredboardgames.com")
MONGO_URI = os.getenv("MONGO_URI")


async def init_db():
    client = AsyncIOMotorClient(MONGO_URI)
    await init_beanie(
        database=client.get_default_database(),
        document_models=[Product, Category]
    )


def fetch_live_categories():
    resp = requests.get(f"{BASE_URL}/api/categories")
    resp.raise_for_status()
    return resp.json()


def fetch_live_products():
    resp = requests.get(f"{BASE_URL}/api/products")
    resp.raise_for_status()
    return resp.json()


async def main():
    if not MONGO_URI:
        raise RuntimeError("MONGO_URI not set in environment variables!")
    await init_db()
    cats = fetch_live_categories()
    prods = fetch_live_products()

    # Upsert categories from API
    for cat in cats:
        slug = cat["slug"]
        db_cat = await Category.find_one(Category.slug == slug)
        if db_cat:
            db_cat.description = cat.get("description", "")
            await db_cat.save()
        else:
            await Category(
                category_id=cat.get("category_id"),
                name=cat.get("name"),
                slug=slug,
                description=cat.get("description", ""),
                tags=cat.get("tags", []),
                image=cat.get("image", ""),
                custom_url=cat.get("custom_url"),
            ).insert()
            print(f"Inserted category {slug}")

    # Upsert products from API
    for prod in prods:
        slug = prod["slug"]
        db_prod = await Product.find_one(Product.slug == slug)
        if db_prod:
            db_prod.name = prod.get("name")
            db_prod.description = prod.get("description", db_prod.description)
            db_prod.price = prod.get("price", db_prod.price)
            db_prod.images = prod.get("images", db_prod.images)
            # Alibaba-related fields
            db_prod.vendor = prod.get("vendor", "Alibaba")
            db_prod.currency = prod.get("currency", "USD")
            await db_prod.save()
            print(f"Updated product {slug}")
        else:
            await Product(
                product_id=prod.get("product_id"),
                name=prod.get("name"),
                description=prod.get("description", ""),
                price=prod.get("price", 0.0),
                images=prod.get("images", []),
                tags=prod.get("tags", []),
                categories=prod.get("categories", []),
                sku=prod.get("sku"),
                inventory=prod.get("inventory"),
                specs=prod.get("specs", {}),
                sale_price=prod.get("sale_price"),
                slug=slug,
                custom_url=prod.get("custom_url"),
                alibaba_product_id=prod.get("alibaba_product_id", slug),
                alibaba_sku_id=prod.get("alibaba_sku_id", ""),
                cost_price=prod.get("cost_price", round(prod.get("price", 0)/2,2)),
                weight=prod.get("weight", 1.0),
                length=prod.get("length", 10.0),
                width=prod.get("width", 10.0),
                height=prod.get("height", 5.0),
                shipping_template_id=prod.get("shipping_template_id", ""),
                moq=prod.get("moq", 1),
                currency=prod.get("currency", "USD"),
                product_url=prod.get("product_url", f"{BASE_URL}/products/{slug}"),
                vendor=prod.get("vendor", "Alibaba"),
                variants=prod.get("variants", []),
            ).insert()
            print(f"Inserted product {slug}")


if __name__ == '__main__':
    asyncio.run(main())
