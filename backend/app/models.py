from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class TryOnSession(Base):
    __tablename__ = "tryon_sessions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_image_path = Column(String, nullable=False)
    dress_image_path = Column(String, nullable=False)
    output_image_path = Column(String, nullable=False)
    model_used = Column(String, nullable=False)
    confidence_score = Column(Float, nullable=True)
    processing_time = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)