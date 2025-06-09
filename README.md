# Neuro-Canvas

Neuro-Canvas is a prototype "visual translation engine" that combines a FastAPI
backend for NLP processing with a simple React/Vite frontend. The application
allows users to submit text, view token information (keywords, part-of-speech and
color tags) and store visual canvas states.

## Repository layout

- `backend/` – FastAPI service with NLP utilities, API endpoints and tests.
- `frontend/` – React/Vite application that communicates with the backend.
- `developer_spec.md` – technical design document describing the MVP.
- `USER_GUIDE.md` – step by step guide for running the project locally.

The backend README in `backend/README.md` contains detailed setup
instructions for its virtual environment and dependencies.

## Quick start

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd neuro-canvas
   ```
2. **Setup the backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Windows use venv\Scripts\activate
   pip install -r requirements.txt
   python -m spacy download en_core_web_sm
   cp .env.example .env
   uvicorn app.main:app --reload
   ```
   The API server runs on `http://localhost:8000`.

3. **Setup the frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
Access the app at `http://localhost:3000`.

For a one-command startup using Docker, refer to `USER_GUIDE.md`.

## API Endpoints

The backend provides a minimal REST API:

- `POST /api/v1/process` – NLP processing of input text.
- `POST /api/v1/canvases` – create a new canvas state.
- `GET /api/v1/canvases/{canvas_id}` – fetch a saved canvas.
- `PUT /api/v1/canvases/{canvas_id}` – update an existing canvas.
- `DELETE /api/v1/canvases/{canvas_id}` – remove a canvas.

## Running tests

After installing backend dependencies, tests can be executed from the project
root:

```bash
pytest -q
```

## More information

- API usage examples and typical workflows are provided in `USER_GUIDE.md`.
- Development tasks and the overall architecture are detailed in
  `developer_spec.md`.
