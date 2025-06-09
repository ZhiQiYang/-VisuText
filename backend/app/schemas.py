from pydantic import BaseModel
from typing import List, Optional

class ProcessRequest(BaseModel):
    text: str
    config: Optional[dict] = None

class TokenData(BaseModel):
    token: str
    pos: str
    is_keyword: bool
    color_tag: str
    lemma: str
    char_start: int
    char_end: int

class ProcessResponse(BaseModel):
    original_text: str
    processed_data: List[TokenData]

class CanvasRequest(BaseModel):
    name: str
    source_document_id: Optional[str] = None
    canvas_state: dict

class CanvasResponse(CanvasRequest):
    id: str
    created_at: str
