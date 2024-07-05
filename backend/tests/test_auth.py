from httpx import AsyncClient


async def test_register(ac: AsyncClient):
    response = await ac.post("/api/auth/register", json={
        "full_name": "testing",
        "email": "testing",
        "role": "testing",
        "hashed_password": "testing"
    })

    assert response.status_code == 200


async def test_login(ac: AsyncClient):
    data = {"username": "testing", "password": "testing"}
    response = await ac.post("/api/auth/token", data=data)

    assert response.status_code == 200
