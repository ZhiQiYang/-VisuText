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
    canvas = CANVASES.get(canvas_id)
    if not canvas:
        return None
    canvas.update(
        {
            "name": data.get("name", canvas["name"]),
            "source_document_id": data.get("source_document_id", canvas.get("source_document_id")),
            "canvas_state": data.get("canvas_state", canvas["canvas_state"]),
            "updated_at": datetime.utcnow().isoformat() + "Z",
        }
    )
    return canvas
