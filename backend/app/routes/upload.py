from fastapi import APIRouter, File, UploadFile, HTTPException, status, Depends
from typing import List
import os

ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "gif"}
UPLOAD_DIR = "uploads/"

router = APIRouter()

def allowed_file(filename: str) -> bool:
    ext = filename.rsplit(".", 1)[-1].lower()
    return ext in ALLOWED_EXTENSIONS

@router.post("/upload")
def upload_file(file: UploadFile = File(...)):
    if not allowed_file(file.filename):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="File type not allowed.")
    safe_filename = os.path.basename(file.filename)
    file_path = os.path.join(UPLOAD_DIR, safe_filename)
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())
    return {"filename": safe_filename}
