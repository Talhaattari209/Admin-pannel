from fastapi import APIRouter, UploadFile, File, HTTPException, status
from fastapi.responses import JSONResponse
from typing import List
import os
import uuid
from pathlib import Path
from app.config import settings

router = APIRouter()

# Ensure upload directory exists
UPLOAD_DIR = Path(settings.UPLOAD_DIR)
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

def validate_file(file: UploadFile) -> bool:
    """Validate file size and extension"""
    # Check file extension
    file_ext = file.filename.split(".")[-1].lower() if "." in file.filename else ""
    if file_ext not in settings.allowed_extensions_list:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File type '.{file_ext}' is not allowed. Allowed types: {', '.join(settings.allowed_extensions_list)}"
        )
    return True

def save_file(file: UploadFile) -> dict:
    """Save uploaded file and return file info"""
    file_ext = file.filename.split(".")[-1] if "." in file.filename else ""
    unique_filename = f"{uuid.uuid4()}.{file_ext}"
    file_path = UPLOAD_DIR / unique_filename
    
    # Save file
    with open(file_path, "wb") as buffer:
        content = file.file.read()
        
        # Check file size
        if len(content) > settings.MAX_FILE_SIZE:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"File size exceeds maximum allowed size of {settings.MAX_FILE_SIZE} bytes"
            )
        
        buffer.write(content)
    
    return {
        "filename": unique_filename,
        "original_filename": file.filename,
        "file_path": str(file_path),
        "url": f"/uploads/{unique_filename}",
        "size": len(content)
    }

# ==================== Upload Single File ====================

@router.post("/single")
async def upload_single_file(file: UploadFile = File(...)):
    """
    Upload a single file
    Returns file information including URL
    """
    validate_file(file)
    file_info = save_file(file)
    
    return {
        "success": True,
        "message": "File uploaded successfully",
        "data": file_info
    }

# ==================== Upload Multiple Files ====================

@router.post("/multiple")
async def upload_multiple_files(files: List[UploadFile] = File(...)):
    """
    Upload multiple files
    Returns array of file information
    """
    if not files:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No files provided"
        )
    
    uploaded_files = []
    
    for file in files:
        validate_file(file)
        file_info = save_file(file)
        uploaded_files.append(file_info)
    
    return {
        "success": True,
        "message": f"{len(uploaded_files)} file(s) uploaded successfully",
        "data": uploaded_files
    }
