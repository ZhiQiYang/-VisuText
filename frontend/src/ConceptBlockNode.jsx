import React from 'react';

export default function ConceptBlockNode({ data }) {
  return (
    <div style={{ padding: '6px 10px', border: '1px solid #333', borderRadius: '6px', background: '#fafafa', minWidth: '120px' }}>
      <strong>{data.label}</strong>
      {data.summary && <div style={{ fontSize: '12px', marginTop: '4px' }}>{data.summary}</div>}
    </div>
  );
}
