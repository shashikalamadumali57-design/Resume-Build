import { useState } from 'react';
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react';
import { useCV } from '../../context/CVContext';

const blank = () => ({ name: '', issuer: '', date: '' });

export default function CertificationsSection() {
  const { cvData, addItem, updateItem, deleteItem } = useCV();
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState(blank());
  const [adding, setAdding] = useState(false);

  const set = (k, v) => setDraft((d) => ({ ...d, [k]: v }));
  const saveNew = () => {
    if (!draft.name) return;
    addItem('certifications', draft);
    setDraft(blank()); setAdding(false);
  };
  const startEdit = (item) => { setEditing(item.id); setDraft({ ...item }); };
  const saveEdit = () => { updateItem('certifications', editing, draft); setEditing(null); };

  const Form = ({ onSave, onCancel }) => (
    <div className="item-form">
      <div className="form-grid">
        <div className="form-group full"><label>Certificate Name</label><input value={draft.name} onChange={e => set('name', e.target.value)} placeholder="AWS Solutions Architect" /></div>
        <div className="form-group"><label>Issuing Organization</label><input value={draft.issuer} onChange={e => set('issuer', e.target.value)} placeholder="Amazon Web Services" /></div>
        <div className="form-group"><label>Date</label><input type="month" value={draft.date} onChange={e => set('date', e.target.value)} /></div>
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
        <button className="btn btn-primary btn-sm" onClick={onSave}><Check size={13} />Save</button>
        <button className="btn btn-ghost btn-sm" onClick={onCancel}><X size={13} />Cancel</button>
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: 12 }}>
      {cvData.certifications.map((item) => (
        <div key={item.id} className="item-card">
          <div className="item-card-header">
            <div style={{ flex: 1 }}>
              <div className="item-card-title">{item.name || 'Certificate'}</div>
              <div className="item-card-sub">{item.issuer} {item.date ? `· ${item.date}` : ''}</div>
            </div>
            <div className="item-card-actions">
              <button className="btn-icon" onClick={() => editing === item.id ? setEditing(null) : startEdit(item)} title="Edit"><Pencil size={13} /></button>
              <button className="btn-icon" style={{ color: 'var(--danger)' }} onClick={() => deleteItem('certifications', item.id)} title="Delete"><Trash2 size={13} /></button>
            </div>
          </div>
          {editing === item.id && <Form onSave={saveEdit} onCancel={() => setEditing(null)} />}
        </div>
      ))}
      {adding ? (
        <div className="item-card">
          <div className="item-card-title" style={{ marginBottom: 4 }}>New Certification</div>
          <Form onSave={saveNew} onCancel={() => { setAdding(false); setDraft(blank()); }} />
        </div>
      ) : (
        <button className="add-btn" onClick={() => { setAdding(true); setDraft(blank()); }}>
          <Plus size={14} /> Add Certification
        </button>
      )}
    </div>
  );
}
