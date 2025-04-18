import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

@pytest.mark.parametrize("email,password,name", [
    ("newuser@bbg.com", "securepass", "New User"),
    ("failuser@bbg.com", "short", "Fail User")
])
def test_register(email, password, name):
    resp = client.post("/auth/register", json={"email": email, "password": password, "name": name})
    if len(password) < 8:
        assert resp.status_code == 422
    else:
        assert resp.status_code == 200
        assert "Registration successful" in resp.json()["msg"]

def test_login_success():
    client.post("/auth/register", json={"email": "testlogin@bbg.com", "password": "testpass123", "name": "Test Login"})
    resp = client.post("/auth/login", json={"email": "testlogin@bbg.com", "password": "testpass123"})
    assert resp.status_code == 200
    assert "Login successful" in resp.json()["msg"]

def test_login_failure():
    resp = client.post("/auth/login", json={"email": "notfound@bbg.com", "password": "wrongpass"})
    assert resp.status_code == 401
