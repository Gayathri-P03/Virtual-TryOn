from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from gradio_client import Client, handle_file
from dotenv import load_dotenv
import psycopg2
import os
import uuid
import shutil

from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv
import os

load_dotenv()   # ✅ simple, correct

app = FastAPI()

UPLOAD_DIR = "uploads"
OUTPUT_DIR = "outputs"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

app.mount("/outputs", StaticFiles(directory=OUTPUT_DIR), name="outputs")

HF_TOKEN = os.getenv("HF_TOKEN")

if not HF_TOKEN:
    raise Exception("HF_TOKEN missing. Add HF_TOKEN in .env file")

client = Client("yisol/IDM-VTON")

from dotenv import load_dotenv
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(BASE_DIR, ".env"))

DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

conn = psycopg2.connect(
    host=DB_HOST,
    database=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD
)

cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS tryon_results (
    id SERIAL PRIMARY KEY,
    user_image TEXT,
    cloth_image TEXT,
    output_image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")
conn.commit()


@app.get("/")
def home():
    return {"message": "Virtual Try-On API Running"}


def save_upload_file(upload_file: UploadFile, folder: str):
    file_ext = os.path.splitext(upload_file.filename)[1]
    file_name = f"{uuid.uuid4()}{file_ext}"
    file_path = os.path.join(folder, file_name)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)

    return file_path


@app.post("/virtual-tryon")
async def virtual_tryon(
    user_image: UploadFile = File(...),
    cloth_image: UploadFile = File(...)
):
    try:
        user_path = save_upload_file(user_image, UPLOAD_DIR)
        cloth_path = save_upload_file(cloth_image, UPLOAD_DIR)

        garment_description = "a stylish t-shirt"

        result = client.predict(
            dict={
                "background": handle_file(user_path),
                "layers": [],
                "composite": None
            },
            garm_img=handle_file(cloth_path),
            garment_des=garment_description,
            is_checked=True,
            is_checked_crop=False,
            denoise_steps=30,
            seed=42,
            api_name="/tryon"
        )

        generated_file = result[0] if isinstance(result, tuple) else result

        output_file = os.path.join(OUTPUT_DIR, f"{uuid.uuid4()}.png")

        shutil.copy(generated_file, output_file)

        cursor.execute(
            """
            INSERT INTO tryon_results
            (user_image, cloth_image, output_image)
            VALUES (%s, %s, %s)
            RETURNING id
            """,
            (user_path, cloth_path, output_file)
        )

        record_id = cursor.fetchone()[0]
        conn.commit()

        return {
            "message": "Virtual try-on generated successfully",
            "id": record_id,
            "user_image": user_path,
            "cloth_image": cloth_path,
            "output_image": f"/outputs/{os.path.basename(output_file)}"
        }

    except Exception as e:
        conn.rollback()
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )


@app.get("/results")
def get_results():
    try:
        cursor.execute("""
        SELECT id, user_image, cloth_image, output_image, created_at
        FROM tryon_results
        ORDER BY id DESC
        """)

        rows = cursor.fetchall()

        data = []

        for row in rows:
            data.append({
                "id": row[0],
                "user_image": row[1],
                "cloth_image": row[2],
                "output_image": row[3],
                "created_at": str(row[4])
            })

        return data

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )


@app.get("/result/{result_id}")
def get_single_result(result_id: int):
    try:
        cursor.execute("""
        SELECT id, user_image, cloth_image, output_image, created_at
        FROM tryon_results
        WHERE id = %s
        """, (result_id,))

        row = cursor.fetchone()

        if not row:
            return JSONResponse(
                status_code=404,
                content={"error": "Result not found"}
            )

        return {
            "id": row[0],
            "user_image": row[1],
            "cloth_image": row[2],
            "output_image": row[3],
            "created_at": str(row[4])
        }

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



