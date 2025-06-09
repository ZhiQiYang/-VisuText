import React, { useState, useCallback, useEffect } from 'react';
import { processText, saveCanvas, getCanvas } from './api';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';


function Sidebar({ tokens, onChange }) {
  const colors = ['red', 'blue', 'green', 'gray'];
  return (

    <aside style={{ width: '200px', borderLeft: '1px solid #ccc', padding: '0 1rem' }}>
      <h3>Tokens</h3>
      {tokens.map((t, idx) => (
        <div
          key={idx}
          style={{ marginBottom: '4px' }}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('application/reactflow', t.token);
            e.dataTransfer.effectAllowed = 'move';
          }}
        >
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
  const [canvasId, setCanvasId] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedEdges, setSelectedEdges] = useState([]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('canvas_id');
    if (id) {
      getCanvas(id)
        .then((data) => {
          setCanvasName(data.name);
          setTokens(data.canvas_state.tokens || []);
          setNodes(data.canvas_state.nodes || []);
          setEdges(data.canvas_state.edges || []);
          setCanvasId(data.id);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const token = event.dataTransfer.getData('application/reactflow');
      if (!token) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      const position = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };
      const id = `${token}-${nodes.length}`;
      const newNode = {
        id,
        position,
        data: { label: token },
        type: 'default',
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [nodes]
  );

  const onSelectionChange = useCallback(({ nodes, edges }) => {
    setSelectedNodes(nodes.map((n) => n.id));
    setSelectedEdges(edges.map((e) => e.id));
  }, []);

  const deleteSelected = () => {
    if (selectedNodes.length === 0) return;
    setNodes((nds) => nds.filter((n) => !selectedNodes.includes(n.id)));
    if (selectedEdges.length > 0) {
      setEdges((eds) => eds.filter((e) => !selectedEdges.includes(e.id)));
    }
    setSelectedNodes([]);
    setSelectedEdges([]);
  };

  const toggleEdgeStyle = () => {
    if (selectedEdges.length === 0) return;
    setEdges((eds) =>
      eds.map((e) => {
        if (selectedEdges.includes(e.id)) {
          const dashed = e.style && e.style.strokeDasharray;
          const style = dashed ? {} : { strokeDasharray: '5,5' };
          return { ...e, style };
        }
        return e;
      })
    );
    setSelectedEdges([]);
  };

  const handleProcess = async () => {
    try {
      const result = await processText(text);
      setTokens(result.processed_data);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
   
    <ReactFlowProvider>
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
              const saved = await saveCanvas(
                {
                  name: canvasName || 'Untitled',
                  canvas_state: { tokens, nodes, edges },
                },
                canvasId
              );
              setCanvasId(saved.id);
              alert('Canvas saved');
            } catch (err) {
              alert(err.message);
            }
          }}
          style={{ marginLeft: '8px' }}
        >
          Save Canvas
        </button>
        <button onClick={deleteSelected} style={{ marginLeft: '8px' }}>
          Delete Selected
        </button>
        <button onClick={toggleEdgeStyle} style={{ marginLeft: '8px' }}>
          Toggle Edge Style
        </button>
        <div
          style={{ height: '60vh', border: '1px solid #ccc', marginTop: '1rem' }}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onSelectionChange={onSelectionChange}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
      <Sidebar tokens={tokens} onChange={setTokens} />
    </div>
    </ReactFlowProvider>
  );
}
