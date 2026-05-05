import os
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(BASE_DIR, ".env"))

INPUT_FOLDER = os.path.join(BASE_DIR, "storage", "inputs")
OUTPUT_FOLDER = os.path.join(BASE_DIR, "storage", "outputs")

os.makedirs(INPUT_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

DATABASE_URL = os.getenv("DATABASE_URL")
HF_TOKEN = os.getenv("HF_TOKEN")
API_URL = os.getenv("API_URL")