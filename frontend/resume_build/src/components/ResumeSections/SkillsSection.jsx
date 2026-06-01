import { useState } from 'react';
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react';
import { useCV } from '../../context/CVContext';

const blank = () => ({ name: '', percentage: 80 });

export default function SkillsSection() {
  const { cvData, addItem, updateItem, deleteItem } = useCV();
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState(blank());
  const [adding, setAdding] = useState(false);

  const set = (k, v) => setDraft((d) => ({ ...d, [k]: v }));
  const saveNew = () => {
    if (!draft.name) return;
    addItem('skills', draft);
    setDraft(blank()); setAdding(false);
  };
  const startEdit = (item) => { setEditing(item.id); setDraft({ ...item }); };
  const saveEdit = () => { updateItem('skills', editing, draft); setEditing(null); };

  const Form = ({ onSave, onCancel }) => (
    <div className="item-form">
      <div className="form-group">
        <label>Skill Name</label>
        <input value={draft.name} onChange={e => set('name', e.target.value)} placeholder="e.g. React, Python..." />
      </div>
      <div className="form-group" style={{ marginTop: 8 }}>
        <label>Proficiency — {draft.percentage}%</label>
        <div className="pct-row">
          <input type="range" min={5} max={100} value={draft.percentage}
            onChange={e => set('percentage', +e.target.value)} />
          <span className="pct-val">{draft.percentage}%</span>
        </div>
        {/* Visual preview bar */}
        <div style={{ height: 6, background: 'var(--card)', borderRadius: 99, marginTop: 6, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${draft.percentage}%`, background: 'var(--accent)', borderRadius: 99, transition: 'width 0.2s' }} />
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
      {cvData.skills.map((item) => (
        <div key={item.id} className="item-card">
          <div className="item-card-header">
            <div style={{ flex: 1 }}>
              <div className="item-card-title">{item.name || 'Skill'}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 5 }}>
                <div style={{ flex: 1, height: 5, background: 'var(--bg)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${item.percentage}%`, background: 'var(--accent)', borderRadius: 99 }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', minWidth: 30 }}>{item.percentage}%</span>
              </div>
            </div>
            <div className="item-card-actions" style={{ marginLeft: 8 }}>
              <button className="btn-icon" onClick={() => editing === item.id ? setEditing(null) : startEdit(item)} title="Edit"><Pencil size={13} /></button>
              <button className="btn-icon" style={{ color: 'var(--danger)' }} onClick={() => deleteItem('skills', item.id)} title="Delete"><Trash2 size={13} /></button>
            </div>
          </div>
          {editing === item.id && <Form onSave={saveEdit} onCancel={() => setEditing(null)} />}
        </div>
      ))}
      {adding ? (
        <div className="item-card">
          <div className="item-card-title" style={{ marginBottom: 4 }}>New Skill</div>
          <Form onSave={saveNew} onCancel={() => { setAdding(false); setDraft(blank()); }} />
        </div>
      ) : (
        <button className="add-btn" onClick={() => { setAdding(true); setDraft(blank()); }}>
          <Plus size={14} /> Add Skill
        </button>
      )}
    </div>
  );
}
