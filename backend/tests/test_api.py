import pytest

pytest.importorskip("fastapi")

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
    canvas_payload = {
        'name': 'Temp',
        'canvas_state': {'nodes': []}
    }
    resp = client.post('/api/v1/canvases', json=canvas_payload)
    canvas_id = resp.json()['id']

    update_payload = {
        'name': 'Updated',
        'canvas_state': {'nodes': [{'id': 'n1'}]}
    }
    put_resp = client.put(f'/api/v1/canvases/{canvas_id}', json=update_payload)
    assert put_resp.status_code == 200
    data = put_resp.json()
    assert data['id'] == canvas_id
    assert data['name'] == 'Updated'
    assert data['canvas_state']['nodes'][0]['id'] == 'n1'
