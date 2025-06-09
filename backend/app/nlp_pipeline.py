import spacy
from yake import KeywordExtractor

# Load a small English model to obtain POS tags and lemmas.
# Make sure to install it via:
#     python -m spacy download en_core_web_sm
nlp = spacy.load("en_core_web_sm")
keyword_extractor = KeywordExtractor()

POS_COLOR_MAP = {
    "NOUN": "red",
    "VERB": "blue",
    "ADJ": "green",
}


def get_color_tag(pos: str) -> str:
    return POS_COLOR_MAP.get(pos, "gray")


def process_text(text: str):
    doc = nlp(text)
    keywords = {kw[0] for kw in keyword_extractor.extract_keywords(text)}
    processed = []
    for token in doc:
        processed.append({
            "token": token.text,
            "pos": token.pos_,
            "is_keyword": token.text in keywords,
            "color_tag": get_color_tag(token.pos_),
            "lemma": token.lemma_,
            "char_start": token.idx,
            "char_end": token.idx + len(token.text),
        })
    return {"original_text": text, "processed_data": processed}
