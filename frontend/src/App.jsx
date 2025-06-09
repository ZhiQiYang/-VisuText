import React, { useState } from 'react';
import { processText, saveCanvas, updateCanvas, fetchCanvas } from './api';

function TokenView({ data }) {
  return (
    <span style={{ color: data.color_tag, marginRight: '4px' }}>
      {data.token}
    </span>
  );
}

export default function App() {
  const [text, setText] = useState('');
  const [tokens, setTokens] = useState([]);
  const [canvasName, setCanvasName] = useState('');
  const [canvasId, setCanvasId] = useState('');
  const [loadId, setLoadId] = useState('');

  const handleProcess = async () => {
    try {
      const result = await processText(text);
      setTokens(result.processed_data);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        name: canvasName || 'Untitled',
        canvas_state: { tokens }
      };
      let result;
      if (canvasId) {
        result = await updateCanvas(canvasId, payload);
      } else {
        result = await saveCanvas(payload);
        setCanvasId(result.id);
      }
      alert('Canvas saved');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLoad = async () => {
    try {
      const canvas = await fetchCanvas(loadId);
      setCanvasId(canvas.id);
      setCanvasName(canvas.name);
      setTokens(canvas.canvas_state.tokens || []);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1>Neuro-Canvas</h1>
      {canvasId && (
        <div style={{ marginBottom: '4px' }}>
          <strong>ID:</strong> {canvasId}
        </div>
      )}
      <input
        type="text"
        placeholder="Canvas name"
        value={canvasName}
        onChange={(e) => setCanvasName(e.target.value)}
      />
      <textarea
        rows="6"
        cols="60"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={handleProcess}>Process</button>
      <button onClick={handleSave} style={{ marginLeft: '8px' }}>
        Save Canvas
      </button>
      <div style={{ marginTop: '8px' }}>
        <input
          type="text"
          placeholder="Canvas ID"
          value={loadId}
          onChange={(e) => setLoadId(e.target.value)}
        />
        <button onClick={handleLoad} style={{ marginLeft: '4px' }}>
          Load
        </button>
      </div>
      <div style={{ marginTop: '1rem' }}>
        {tokens.map((t, idx) => (
          <TokenView key={idx} data={t} />
        ))}
      </div>
    </div>
  );
}
