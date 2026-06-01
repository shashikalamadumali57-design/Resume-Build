import { useState } from 'react';
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react';
import { useCV } from '../../context/CVContext';

const blank = () => ({ institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' });

export default function EducationSection() {
  const { cvData, addItem, updateItem, deleteItem } = useCV();
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState(blank());
  const [adding, setAdding] = useState(false);

  const set = (k, v) => setDraft((d) => ({ ...d, [k]: v }));

  const saveNew = () => {
    if (!draft.institution) return;
    addItem('education', draft);
    setDraft(blank()); setAdding(false);
  };
  const startEdit = (item) => { setEditing(item.id); setDraft({ ...item }); };
  const saveEdit = () => { updateItem('education', editing, draft); setEditing(null); };

  const Form = ({ onSave, onCancel }) => (
    <div className="item-form">
      <div className="form-grid">
        <div className="form-group full"><label>Institution</label><input value={draft.institution} onChange={e => set('institution', e.target.value)} placeholder="University name" /></div>
        <div className="form-group"><label>Degree</label><input value={draft.degree} onChange={e => set('degree', e.target.value)} placeholder="Bachelor of Science" /></div>
        <div className="form-group"><label>Field of Study</label><input value={draft.field} onChange={e => set('field', e.target.value)} placeholder="Computer Science" /></div>
        <div className="form-group"><label>Start Date</label><input type="month" value={draft.startDate} onChange={e => set('startDate', e.target.value)} /></div>
        <div className="form-group"><label>End Date</label><input type="month" value={draft.endDate} onChange={e => set('endDate', e.target.value)} /></div>
        <div className="form-group full"><label>GPA (optional)</label><input value={draft.gpa} onChange={e => set('gpa', e.target.value)} placeholder="3.8" /></div>
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
        <button className="btn btn-primary btn-sm" onClick={onSave}><Check size={13} />Save</button>
        <button className="btn btn-ghost btn-sm" onClick={onCancel}><X size={13} />Cancel</button>
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: 12 }}>
      {cvData.education.map((item) => (
        <div key={item.id} className="item-card">
          <div className="item-card-header">
            <div style={{ flex: 1 }}>
              <div className="item-card-title">{item.institution || 'Institution'}</div>
              <div className="item-card-sub">{item.degree} {item.field ? `in ${item.field}` : ''}</div>
            </div>
            <div className="item-card-actions">
              <button className="btn-icon" onClick={() => editing === item.id ? setEditing(null) : startEdit(item)} title="Edit"><Pencil size={13} /></button>
              <button className="btn-icon" style={{ color: 'var(--danger)' }} onClick={() => deleteItem('education', item.id)} title="Delete"><Trash2 size={13} /></button>
            </div>
          </div>
          {editing === item.id && <Form onSave={saveEdit} onCancel={() => setEditing(null)} />}
        </div>
      ))}
      {adding ? (
        <div className="item-card">
          <div className="item-card-title" style={{ marginBottom: 4 }}>New Education</div>
          <Form onSave={saveNew} onCancel={() => { setAdding(false); setDraft(blank()); }} />
        </div>
      ) : (
        <button className="add-btn" onClick={() => { setAdding(true); setDraft(blank()); }}>
          <Plus size={14} /> Add Education
        </button>
      )}
    </div>
  );
}
