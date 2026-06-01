import { useState } from 'react';
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react';
import { useCV } from '../../context/CVContext';

const blank = () => ({ name: '', percentage: 75, level: 'Intermediate' });
const LEVELS = ['Basic', 'Elementary', 'Intermediate', 'Upper-Intermediate', 'Advanced', 'Native'];

function CircleRing({ pct, color = '#6c63ff', size = 36 }) {
  const r = (size - 4) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth={3} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={3}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`} />
      <text x="50%" y="54%" textAnchor="middle" fontSize={size * 0.22} fill={color} fontWeight="700">{pct}%</text>
    </svg>
  );
}

export default function LanguagesSection() {
  const { cvData, addItem, updateItem, deleteItem } = useCV();
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState(blank());
  const [adding, setAdding] = useState(false);
  const primary = cvData.theme.primaryColor;

  const set = (k, v) => setDraft((d) => ({ ...d, [k]: v }));
  const saveNew = () => {
    if (!draft.name) return;
    addItem('languages', draft);
    setDraft(blank()); setAdding(false);
  };
  const startEdit = (item) => { setEditing(item.id); setDraft({ ...item }); };
  const saveEdit = () => { updateItem('languages', editing, draft); setEditing(null); };

  const Form = ({ onSave, onCancel }) => (
    <div className="item-form">
      <div className="form-grid">
        <div className="form-group">
          <label>Language</label>
          <input value={draft.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Spanish" />
        </div>
        <div className="form-group">
          <label>Level</label>
          <select value={draft.level} onChange={e => set('level', e.target.value)}>
            {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="form-group full">
          <label>Proficiency — {draft.percentage}%</label>
          <div className="pct-row">
            <input type="range" min={5} max={100} value={draft.percentage}
              onChange={e => set('percentage', +e.target.value)} />
            <span className="pct-val">{draft.percentage}%</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
            <CircleRing pct={draft.percentage} color={primary} size={56} />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
        <button className="btn btn-primary btn-sm" onClick={onSave}><Check size={13} />Save</button>
        <button className="btn btn-ghost btn-sm" onClick={onCancel}><X size={13} />Cancel</button>
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: 12 }}>
      {cvData.languages.map((item) => (
        <div key={item.id} className="item-card">
          <div className="item-card-header">
            <CircleRing pct={item.percentage} color={primary} size={38} />
            <div style={{ flex: 1, marginLeft: 8 }}>
              <div className="item-card-title">{item.name || 'Language'}</div>
              <div className="item-card-sub">{item.level}</div>
            </div>
            <div className="item-card-actions">
              <button className="btn-icon" onClick={() => editing === item.id ? setEditing(null) : startEdit(item)} title="Edit"><Pencil size={13} /></button>
              <button className="btn-icon" style={{ color: 'var(--danger)' }} onClick={() => deleteItem('languages', item.id)} title="Delete"><Trash2 size={13} /></button>
            </div>
          </div>
          {editing === item.id && <Form onSave={saveEdit} onCancel={() => setEditing(null)} />}
        </div>
      ))}
      {adding ? (
        <div className="item-card">
          <div className="item-card-title" style={{ marginBottom: 4 }}>New Language</div>
          <Form onSave={saveNew} onCancel={() => { setAdding(false); setDraft(blank()); }} />
        </div>
      ) : (
        <button className="add-btn" onClick={() => { setAdding(true); setDraft(blank()); }}>
          <Plus size={14} /> Add Language
        </button>
      )}
    </div>
  );
}
