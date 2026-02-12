from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from app.config import settings
from app.api.v1 import router as v1_router
from app.api.v1.upload import router as upload_router

# Create FastAPI application
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    debug=settings.DEBUG,
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(v1_router)  # /admin/* routes
app.include_router(upload_router, prefix="/upload", tags=["File Upload"])  # /upload/* routes

# Mount uploads directory for static file serving
upload_dir = Path(settings.UPLOAD_DIR)
upload_dir.mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(upload_dir)), name="uploads")

# Root endpoint
@app.get("/")
def root():
    """API root endpoint"""
    return {
        "name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "docs": "/docs",
        "redoc": "/redoc"
    }

# Health check endpoint
@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "ok", "service": settings.APP_NAME}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG
    )
