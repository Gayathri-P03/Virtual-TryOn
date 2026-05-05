import os
from datetime import datetime
from fastapi import UploadFile
from app.config import INPUT_FOLDER, OUTPUT_FOLDER

def save_upload_file(upload_file: UploadFile, folder: str) -> str:
    ext = os.path.splitext(upload_file.filename)[1]
    filename = datetime.now().strftime("%Y%m%d%H%M%S%f") + ext
    file_path = os.path.join(folder, filename)
    with open(file_path, "wb") as f:
        f.write(upload_file.file.read())
    return file_path

def get_output_path() -> str:
    return os.path.join(OUTPUT_FOLDER, datetime.now().strftime("%Y%m%d%H%M%S%f") + ".png")