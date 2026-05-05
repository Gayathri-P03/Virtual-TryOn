CREATE TABLE tryon_tryon (
    id SERIAL PRIMARY KEY,
    user_image TEXT,
    dress_image TEXT,
    output_image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);