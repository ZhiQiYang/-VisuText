from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .schemas import (
    ProcessRequest,
    ProcessResponse,
    CanvasRequest,
    CanvasResponse,
)
from .nlp_pipeline import process_text
from .canvas_store import create_canvas, get_canvas

app = FastAPI(title="Neuro-Canvas API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from Neuro-Canvas API"}


@app.post("/api/v1/process", response_model=ProcessResponse)
def process_endpoint(payload: ProcessRequest):
    """Process input text and return token information."""
    return process_text(payload.text)


@app.post("/api/v1/canvases", response_model=CanvasResponse, status_code=201)
def create_canvas_endpoint(payload: CanvasRequest):
    """Create a new canvas project and return its metadata."""
    canvas = create_canvas(payload.dict())
    return canvas


@app.get("/api/v1/canvases/{canvas_id}", response_model=CanvasResponse)
def get_canvas_endpoint(canvas_id: str):
    canvas = get_canvas(canvas_id)
    if not canvas:
        raise HTTPException(status_code=404, detail="Canvas not found")
    return canvas
