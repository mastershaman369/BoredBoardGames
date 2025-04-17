import asyncio
import uuid
from product import Product
from category import Category
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
import os

# Sample data for demonstration; replace with real scraped/imported data as needed
SAMPLE_CATEGORIES = [
    {
        "category_id": uuid.uuid4(),
        "name": "Classic Games",
        "description": "Timeless classics.",
        "slug": "classic-games",
        "tags": ["classic", "board"],
        "image": "",
        "custom_url": None,
    },
    {
        "category_id": uuid.uuid4(),
        "name": "Puzzles",
        "description": "Puzzles and brain teasers.",
        "slug": "puzzles",
        "tags": ["puzzle", "brain"],
        "image": "",
        "custom_url": None,
    },
]

SAMPLE_PRODUCTS = [
    {
        "product_id": uuid.uuid4(),
        "name": "Luxury Wooden Monopoly Board",
        "description": "Premium Monopoly board with wooden finish.",
        "price": 199.99,
        "sale_price": 149.99,
        "images": ["/images/monopoly-wood.jpg"],
        "tags": ["monopoly", "wooden", "luxury"],
        "categories": ["classic-games"],
        "sku": "MONO-WOOD-001",
        "inventory": 10,
        "specs": {"material": "wood", "size": "large"},
        "slug": "luxury-wooden-monopoly-board",
        "custom_url": None,
    },
    {
        "product_id": uuid.uuid4(),
        "name": "Super Rubik's Cube",
        "description": "A challenging Rubik's Cube variant.",
        "price": 29.99,
        "sale_price": 19.99,
        "images": ["/images/super-rubiks-cube.jpg"],
        "tags": ["rubik", "cube", "puzzle"],
        "categories": ["puzzles"],
        "sku": "RUBIK-SUPER-001",
        "inventory": 25,
        "specs": {"difficulty": "high"},
        "slug": "super-rubiks-cube",
        "custom_url": None,
    },
]

async def main():
    MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/boredboardgames")
    client = AsyncIOMotorClient(MONGODB_URI)
    await init_beanie(database=client.get_default_database(), document_models=[Product, Category])

    # Insert categories
    for cat in SAMPLE_CATEGORIES:
        exists = await Category.find_one(Category.slug == cat["slug"])
        if not exists:
            await Category(**cat).insert()

    # Insert products
    for prod in SAMPLE_PRODUCTS:
        exists = await Product.find_one(Product.slug == prod["slug"])
        if not exists:
            await Product(**prod).insert()

if __name__ == "__main__":
    asyncio.run(main())
