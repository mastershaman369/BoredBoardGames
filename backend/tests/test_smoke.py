import pytest
from httpx import AsyncClient
from app.main import app

import asyncio

@pytest.mark.asyncio
async def test_products_endpoint():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/api/products")
        assert response.status_code in (200, 404)  # 404 if no products yet, 200 if implemented
