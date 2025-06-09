export async function processText(text) {
  const response = await fetch('/api/v1/process', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  if (!response.ok) {
    throw new Error('Failed to process text');
  }
  return response.json();
}

export async function saveCanvas(data, id) {
  const url = id ? `/api/v1/canvases/${id}` : '/api/v1/canvases';
  const method = id ? 'PUT' : 'POST';
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error('Failed to save canvas');
  }
  return response.json();
}

export async function getCanvas(id) {
  const response = await fetch(`/api/v1/canvases/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch canvas');
  }
  return response.json();
}
