import React, { useState } from 'react';
import { processText, saveCanvas } from './api';

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

  const handleProcess = async () => {
    try {
      const result = await processText(text);
      setTokens(result.processed_data);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1>Neuro-Canvas</h1>
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
      <button
        onClick={async () => {
          try {
            await saveCanvas({
              name: canvasName || 'Untitled',
              canvas_state: { tokens },
            });
            alert('Canvas saved');
          } catch (err) {
            alert(err.message);
          }
        }}
        style={{ marginLeft: '8px' }}
      >
        Save Canvas
      </button>
      <div style={{ marginTop: '1rem' }}>
        {tokens.map((t, idx) => (
          <TokenView key={idx} data={t} />
        ))}
      </div>
    </div>
  );
}
