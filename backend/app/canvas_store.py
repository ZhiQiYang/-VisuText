from datetime import datetime
from typing import Dict, Optional
from uuid import uuid4

CANVASES: Dict[str, dict] = {}


def create_canvas(data: dict) -> dict:
    canvas_id = uuid4().hex
    canvas = {
        "id": canvas_id,
        "name": data["name"],
        "source_document_id": data.get("source_document_id"),
        "canvas_state": data["canvas_state"],
        "created_at": datetime.utcnow().isoformat() + "Z",
    }
    CANVASES[canvas_id] = canvas
    return canvas


def get_canvas(canvas_id: str) -> Optional[dict]:
    return CANVASES.get(canvas_id)


def update_canvas(canvas_id: str, data: dict) -> Optional[dict]:
    """Update an existing canvas in memory."""
    existing = CANVASES.get(canvas_id)
    if not existing:
        return None
    existing["name"] = data.get("name", existing["name"])
    existing["source_document_id"] = data.get(
        "source_document_id", existing.get("source_document_id")
    )
    if "canvas_state" in data:
        existing["canvas_state"] = data["canvas_state"]
    existing["updated_at"] = datetime.utcnow().isoformat() + "Z"
    return existing
