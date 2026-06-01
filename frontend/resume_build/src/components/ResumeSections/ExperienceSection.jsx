import { useState } from 'react';
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react';
import { useCV } from '../../context/CVContext';

const blank = () => ({ company: '', position: '', startDate: '', endDate: '', current: false, location: '', description: '' });

export default function ExperienceSection() {
  const { cvData, addItem, updateItem, deleteItem } = useCV();
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState(blank());
  const [adding, setAdding] = useState(false);

  const set = (k, v) => setDraft((d) => ({ ...d, [k]: v }));

  const saveNew = () => {
    if (!draft.company && !draft.position) return;
    addItem('experience', draft);
    setDraft(blank()); setAdding(false);
  };

  const startEdit = (item) => { setEditing(item.id); setDraft({ ...item }); };
  const saveEdit = () => { updateItem('experience', editing, draft); setEditing(null); };

  const Form = ({ onSave, onCancel }) => (
    <div className="item-form">
      <div className="form-grid">
        <div className="form-group"><label>Company</label><input value={draft.company} onChange={e => set('company', e.target.value)} placeholder="Company name" /></div>
        <div className="form-group"><label>Position</label><input value={draft.position} onChange={e => set('position', e.target.value)} placeholder="Job title" /></div>
        <div className="form-group"><label>Start Date</label><input type="month" value={draft.startDate} onChange={e => set('startDate', e.target.value)} /></div>
        <div className="form-group">
          <label>End Date</label>
          {draft.current ? <input disabled value="Present" /> : <input type="month" value={draft.endDate} onChange={e => set('endDate', e.target.value)} />}
        </div>
        <div className="form-group full">
          <label>Location</label>
          <input value={draft.location} onChange={e => set('location', e.target.value)} placeholder="City, State" />
        </div>
        <div className="form-group full" style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" id="current-chk" checked={draft.current} onChange={e => set('current', e.target.checked)} />
          <label htmlFor="current-chk" style={{ marginBottom: 0, textTransform: 'none', fontSize: 12, color: 'var(--text)' }}>Currently working here</label>
        </div>
        <div className="form-group full">
          <label>Description</label>
          <textarea rows={4} value={draft.description} onChange={e => set('description', e.target.value)} placeholder="• Key achievements and responsibilities..." />
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
      {cvData.experience.map((item) => (
        <div key={item.id} className="item-card">
          <div className="item-card-header">
            <div style={{ flex: 1 }}>
              <div className="item-card-title">{item.position || 'Position'}</div>
              <div className="item-card-sub">{item.company} {item.startDate ? `· ${item.startDate}` : ''}</div>
            </div>
            <div className="item-card-actions">
              <button className="btn-icon" onClick={() => editing === item.id ? setEditing(null) : startEdit(item)} title="Edit"><Pencil size={13} /></button>
              <button className="btn-icon" style={{ color: 'var(--danger)' }} onClick={() => deleteItem('experience', item.id)} title="Delete"><Trash2 size={13} /></button>
            </div>
          </div>
          {editing === item.id && <Form onSave={saveEdit} onCancel={() => setEditing(null)} />}
        </div>
      ))}

      {adding ? (
        <div className="item-card">
          <div className="item-card-title" style={{ marginBottom: 4 }}>New Experience</div>
          <Form onSave={saveNew} onCancel={() => { setAdding(false); setDraft(blank()); }} />
        </div>
      ) : (
        <button className="add-btn" onClick={() => { setAdding(true); setDraft(blank()); }}>
          <Plus size={14} /> Add Experience
        </button>
      )}
    </div>
  );
}
