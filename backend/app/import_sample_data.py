import asyncio
import uuid
from product import Product
from category import Category
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
load_dotenv()

# Sample data for demonstration; replace with real scraped/imported data as needed
SAMPLE_CATEGORIES = [
    {
        "category_id": uuid.uuid4(),
        "name": "Classic Games",
        "description": "Don't be bored, play a board game! Rediscover timeless classics that bring friends together, boost hand-eye coordination, and provide a screen-free escape. Explore our <a href='/collections/puzzles'>Puzzles</a>.",
        "slug": "classic-games",
        "tags": ["classic", "board"],
        "image": "",
        "custom_url": None,
    },
    {
        "category_id": uuid.uuid4(),
        "name": "Puzzles",
        "description": "Don't be bored, play a board game! Dive into mind-bending puzzles that challenge you offline, spark laughter with friends, and sharpen your problem-solving skills. Check out <a href='/collections/classic-games'>Classic Games</a> for more excitement.",
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
        "description": "Don't be bored, play a board game! Our Luxury Wooden Monopoly Board turns family game nights into a premium, tactile experience. Crafted from rich wood, it's perfect for sparking friendly competition, improving negotiation skills, and giving your eyes a break from the screen.",
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
        "description": "Don't be bored, play a board game! Meet the Super Rubik's Cube, a next-level puzzle that challenges your mind and dexterity. Race friends to solve it, boost hand-eye coordination, and unplug from the digital world for pure, tactile fun.",
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
    MONGO_URI = os.getenv("MONGO_URI")
    if not MONGO_URI:
        raise RuntimeError("MONGO_URI not set in environment variables!")
    client = AsyncIOMotorClient(MONGO_URI)
    await init_beanie(database=client.get_default_database(), document_models=[Product, Category])

    # Upsert categories
    for cat in SAMPLE_CATEGORIES:
        db_cat = await Category.find_one(Category.slug == cat["slug"])
        if db_cat:
            db_cat.description = cat["description"]
            await db_cat.save()
        else:
            await Category(**cat).insert()

    # Upsert products
    for prod in SAMPLE_PRODUCTS:
        db_prod = await Product.find_one(Product.slug == prod["slug"])
        if db_prod:
            db_prod.description = prod["description"]
            await db_prod.save()
        else:
            await Product(**prod).insert()

if __name__ == "__main__":
    asyncio.run(main())
