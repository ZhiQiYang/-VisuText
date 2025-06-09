-- SQL schema for PostgreSQL tables

CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS canvases (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    source_document_id INTEGER REFERENCES documents(id),
    canvas_state JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    user_id INTEGER REFERENCES users(id)
);
