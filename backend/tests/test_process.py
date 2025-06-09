from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_process_endpoint():
    resp = client.post('/api/v1/process', json={'text': 'Hello world'})
    assert resp.status_code == 200
    data = resp.json()
    assert 'original_text' in data
    assert data['original_text'] == 'Hello world'
    assert 'processed_data' in data
    assert isinstance(data['processed_data'], list)
    assert len(data['processed_data']) > 0
