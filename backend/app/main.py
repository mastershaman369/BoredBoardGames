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

app = FastAPI()

# CORS setup for local/frontend dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def app_init():
    MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/boredboardgames")
    client = AsyncIOMotorClient(MONGODB_URI)
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
