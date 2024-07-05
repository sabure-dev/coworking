from httpx import AsyncClient


async def test_get_projects(ac: AsyncClient):
    response = await ac.get("/api/projects")

    assert response.json() == {'detail': 'Not Found'}
