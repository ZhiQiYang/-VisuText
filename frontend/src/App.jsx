import React, { useState } from 'react';
import { processText, saveCanvas } from './api';

function TokenView({ data }) {
  const style = {
    color: data.is_keyword ? data.color_tag : '#000',
    fontWeight: data.is_keyword ? 'bold' : 'normal',
    marginRight: '4px',
  };
  return <span style={style}>{data.token}</span>;
}

function Sidebar({ tokens, onChange }) {
  const colors = ['red', 'blue', 'green', 'gray'];
  return (
    <aside style={{ width: '200px', borderLeft: '1px solid #ccc', padding: '0 1rem' }}>
      <h3>Tokens</h3>
      {tokens.map((t, idx) => (
        <div key={idx} style={{ marginBottom: '4px' }}>
          <label>
            <input
              type="checkbox"
              checked={t.is_keyword}
              onChange={(e) => {
                const updated = [...tokens];
                updated[idx] = { ...t, is_keyword: e.target.checked };
                onChange(updated);
              }}
            />
            {t.token}
          </label>
          <select
            value={t.color_tag}
            onChange={(e) => {
              const updated = [...tokens];
              updated[idx] = { ...t, color_tag: e.target.value };
              onChange(updated);
            }}
            style={{ marginLeft: '4px' }}
          >
            {colors.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      ))}
    </aside>
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
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
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
      <Sidebar tokens={tokens} onChange={setTokens} />
    </div>
  );
}
