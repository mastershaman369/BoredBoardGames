from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import router as api_router
from .auth import router as auth_router
from .order_api import router as order_api_router
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio

from .product import Product
from .category import Category
from .order import Order, OrderItem
from .user import User
from .settings import Settings

# Load environment variables from .env
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

# CORS setup for Netlify staging and deploy previews
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://boredboardgames-staging.windsurf.build",
        "https://6802cf87d0d71223f899bfea--unique-marigold-f59e94.netlify.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def app_init():
    MONGO_URI = os.getenv("MONGO_URI")
    if not MONGO_URI:
        raise RuntimeError("MONGO_URI not set in environment variables!")
    client = AsyncIOMotorClient(MONGO_URI)
    await init_beanie(
        database=client.get_default_database(),
        document_models=[Product, Category, Order, OrderItem, User, Settings]
    )

app.include_router(auth_router, prefix="/api")
app.include_router(api_router, prefix="/api")
app.include_router(order_api_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Bored Board Games API is running."}
