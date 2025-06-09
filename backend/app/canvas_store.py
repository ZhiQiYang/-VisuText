from datetime import datetime
from typing import Dict, Optional
from uuid import uuid4

CANVASES: Dict[str, dict] = {}


def create_canvas(data: dict) -> dict:
    canvas_id = uuid4().hex
    now = datetime.utcnow().isoformat() + "Z"
    canvas = {
        "id": canvas_id,
        "name": data["name"],
        "source_document_id": data.get("source_document_id"),
        "canvas_state": data["canvas_state"],
        "created_at": now,
        "updated_at": now,
    }
    CANVASES[canvas_id] = canvas
    return canvas


def get_canvas(canvas_id: str) -> Optional[dict]:
    return CANVASES.get(canvas_id)


def update_canvas(canvas_id: str, data: dict) -> Optional[dict]:
    canvas = CANVASES.get(canvas_id)
    if not canvas:
        return None
    if "name" in data:
        canvas["name"] = data["name"]
    if "source_document_id" in data:
        canvas["source_document_id"] = data["source_document_id"]
    if "canvas_state" in data:
        canvas["canvas_state"] = data["canvas_state"]
    canvas["updated_at"] = datetime.utcnow().isoformat() + "Z"
    return canvas
