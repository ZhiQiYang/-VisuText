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
