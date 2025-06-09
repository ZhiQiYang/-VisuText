from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .schemas import ProcessRequest, ProcessResponse
from .nlp_pipeline import process_text

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
