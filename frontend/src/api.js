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

export async function saveCanvas(data) {
  const response = await fetch('/api/v1/canvases', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error('Failed to save canvas');
  }
  return response.json();
}

export async function updateCanvas(id, data) {
  const response = await fetch(`/api/v1/canvases/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error('Failed to update canvas');
  }
  return response.json();
}

export async function fetchCanvas(id) {
  const response = await fetch(`/api/v1/canvases/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch canvas');
  }
  return response.json();
}
