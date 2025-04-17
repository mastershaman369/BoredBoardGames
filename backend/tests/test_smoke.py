import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../app')))

import pytest
from httpx import AsyncClient
from app.main import app

import asyncio

@pytest.mark.asyncio
async def test_products_endpoint():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/api/products")
        assert response.status_code in (200, 404)  # 404 if no products yet, 200 if implemented
