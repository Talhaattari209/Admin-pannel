import re
import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from app.config import settings

# Convert postgresql:// to postgresql+psycopg:// for async support
DATABASE_URL = re.sub(r'^postgresql:', 'postgresql+psycopg:', settings.DATABASE_URL)

# Create async database engine
engine = create_async_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    echo=settings.DEBUG,
    future=True
)

# Async session factory
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)

# Base class for models
Base = declarative_base()

# Dependency for routes
async def get_db():
    """Async database session dependency"""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
