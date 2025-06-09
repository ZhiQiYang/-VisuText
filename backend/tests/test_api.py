from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_process_endpoint():
    resp = client.post('/api/v1/process', json={'text': 'Hello world'})
    assert resp.status_code == 200
    data = resp.json()
    assert data['original_text'] == 'Hello world'
    assert isinstance(data['processed_data'], list)


def test_create_and_get_canvas():
    canvas_payload = {
        'name': 'Test Canvas',
        'canvas_state': {'tokens': []}
    }
    create_resp = client.post('/api/v1/canvases', json=canvas_payload)
    assert create_resp.status_code == 201
    canvas_data = create_resp.json()
    canvas_id = canvas_data['id']

    get_resp = client.get(f'/api/v1/canvases/{canvas_id}')
    assert get_resp.status_code == 200
    fetched = get_resp.json()
    assert fetched['id'] == canvas_id
    assert fetched['name'] == 'Test Canvas'


def test_update_canvas():
    create_resp = client.post(
        '/api/v1/canvases',
        json={'name': 'Initial', 'canvas_state': {'nodes': []}},
    )
    canvas_id = create_resp.json()['id']

    update_payload = {
        'name': 'Updated Canvas',
        'canvas_state': {'nodes': [{'id': 'n1'}]},
    }
    update_resp = client.put(f'/api/v1/canvases/{canvas_id}', json=update_payload)
    assert update_resp.status_code == 200
    updated = update_resp.json()
    assert updated['id'] == canvas_id
    assert updated['name'] == 'Updated Canvas'
