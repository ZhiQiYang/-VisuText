import pytest
from app.nlp_pipeline import process_text

def test_process_text_basic():
    text = "Hello world."
    result = process_text(text)
    assert result["original_text"] == text
    tokens = result["processed_data"]
    assert any(t["token"].lower() == "hello" for t in tokens)
    assert any(t["token"].lower() == "world" for t in tokens)
    # check that keywords and color tags exist
    for t in tokens:
        assert "is_keyword" in t
        assert "color_tag" in t
        assert "pos" in t
        assert "lemma" in t
