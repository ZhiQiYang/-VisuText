from fastapi import FastAPI

app = FastAPI(title="Neuro-Canvas API")

@app.get("/")
def read_root():
    return {"message": "Hello from Neuro-Canvas API"}
