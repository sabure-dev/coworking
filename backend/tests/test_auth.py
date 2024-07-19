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

    response2 = await ac.get("/api/news/", headers={'Authorization': f'bearer {response.json()["access_token"]}'})

    assert response.status_code == 200 and response2.json() == []
