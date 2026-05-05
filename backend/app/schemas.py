from pydantic import BaseModel

class TryOnResponse(BaseModel):
    processed_image_url: str
    processing_time: float
    model_used: str