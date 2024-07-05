import asyncio

import pytest
from httpx import AsyncClient, ASGITransport
from sqlalchemy import NullPool
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine

from config import TEST_DB_PASS, TEST_DB_HOST, TEST_DB_NAME, TEST_DB_PORT, TEST_DB_USER
from main import app
from database import Base, get_async_session

SQLALCHEMY_DATABASE_URL_TEST = f"postgresql+asyncpg://{TEST_DB_USER}:{TEST_DB_PASS}@{TEST_DB_HOST}:{TEST_DB_PORT}/{TEST_DB_NAME}"

engine_test = create_async_engine(
    SQLALCHEMY_DATABASE_URL_TEST,
    poolclass=NullPool,
)
async_session_maker = sessionmaker(engine_test, class_=AsyncSession, expire_on_commit=False)
Base.metadata.bind = engine_test


async def override_get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session


app.dependency_overrides[get_async_session] = override_get_async_session


@pytest.fixture(autouse=True, scope='session')
async def prepare_database():
    async with engine_test.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with engine_test.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


@pytest.fixture(scope="session")
async def ac() -> AsyncGenerator[AsyncClient, None]:
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        yield ac
