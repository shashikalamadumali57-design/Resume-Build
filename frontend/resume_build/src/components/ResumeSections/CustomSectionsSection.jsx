import { useState } from 'react';
import { Plus, Trash2, Pencil, Check, X, GripVertical, ChevronDown } from 'lucide-react';
import { useCV } from '../../context/CVContext';

export default function CustomSectionsSection() {
  const { cvData, addCustomSection, updateCustomSection, deleteCustomSection, addPoint, updatePoint, deletePoint } = useCV();
  const { customSections } = cvData;

  const [newTitle, setNewTitle] = useState('');
  const [addingSection, setAddingSection] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editingSectionTitle, setEditingSectionTitle] = useState('');
  const [expandedSection, setExpandedSection] = useState(null);

  const [addingPointFor, setAddingPointFor] = useState(null);
  const [newPointText, setNewPointText] = useState('');
  const [editingPoint, setEditingPoint] = useState(null); // { sectionId, pointId }
  const [editingPointText, setEditingPointText] = useState('');

  const handleAddSection = () => {
    if (!newTitle.trim()) return;
    addCustomSection(newTitle.trim());
    setNewTitle('');
    setAddingSection(false);
  };

  const handleSaveSectionTitle = (sectionId) => {
    if (!editingSectionTitle.trim()) return;
    updateCustomSection(sectionId, { title: editingSectionTitle.trim() });
    setEditingSectionId(null);
  };

  const handleAddPoint = (sectionId) => {
    if (!newPointText.trim()) return;
    addPoint(sectionId, newPointText.trim());
    setNewPointText('');
    setAddingPointFor(null);
  };

  const handleSavePoint = () => {
    if (!editingPointText.trim() || !editingPoint) return;
    updatePoint(editingPoint.sectionId, editingPoint.pointId, editingPointText.trim());
    setEditingPoint(null);
  };

  return (
    <div style={{ paddingTop: 12 }}>
      {customSections.length === 0 && !addingSection && (
        <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-muted)', fontSize: 12 }}>
          No custom sections yet. Click below to add one!
        </div>
      )}

      {customSections.map((section) => (
        <div key={section.id} className="item-card" style={{ marginBottom: 10 }}>
          {/* Section Header */}
          <div className="item-card-header">
            <GripVertical size={13} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              {editingSectionId === section.id ? (
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <input
                    value={editingSectionTitle}
                    onChange={(e) => setEditingSectionTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveSectionTitle(section.id)}
                    style={{ flex: 1, fontSize: 13, fontWeight: 600 }}
                    autoFocus
                  />
                  <button className="btn-icon" onClick={() => handleSaveSectionTitle(section.id)}><Check size={13} /></button>
                  <button className="btn-icon" onClick={() => setEditingSectionId(null)}><X size={13} /></button>
                </div>
              ) : (
                <div className="item-card-title">{section.title}</div>
              )}
              <div className="item-card-sub">{section.points.length} point{section.points.length !== 1 ? 's' : ''}</div>
            </div>
            <div className="item-card-actions">
              <button className="btn-icon" onClick={() => {
                setEditingSectionId(section.id);
                setEditingSectionTitle(section.title);
              }} title="Rename"><Pencil size={13} /></button>
              <button className="btn-icon" onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)} title="Expand">
                <ChevronDown size={13} style={{ transform: expandedSection === section.id ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
              </button>
              <button className="btn-icon" style={{ color: 'var(--danger)' }} onClick={() => deleteCustomSection(section.id)} title="Delete"><Trash2 size={13} /></button>
            </div>
          </div>

          {/* Points List */}
          {expandedSection === section.id && (
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--border)' }}>
              {section.points.map((point) => (
                <div key={point.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 8 }}>
                  <span style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0, fontSize: 14 }}>•</span>
                  {editingPoint?.pointId === point.id && editingPoint?.sectionId === section.id ? (
                    <div style={{ flex: 1, display: 'flex', gap: 6 }}>
                      <input
                        value={editingPointText}
                        onChange={(e) => setEditingPointText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSavePoint()}
                        style={{ flex: 1, fontSize: 12 }}
                        autoFocus
                      />
                      <button className="btn-icon" onClick={handleSavePoint}><Check size={12} /></button>
                      <button className="btn-icon" onClick={() => setEditingPoint(null)}><X size={12} /></button>
                    </div>
                  ) : (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ flex: 1, fontSize: 12, color: 'var(--text)', lineHeight: 1.5 }}>{point.text}</span>
                      <button className="btn-icon" onClick={() => { setEditingPoint({ sectionId: section.id, pointId: point.id }); setEditingPointText(point.text); }}><Pencil size={11} /></button>
                      <button className="btn-icon" style={{ color: 'var(--danger)' }} onClick={() => deletePoint(section.id, point.id)}><Trash2 size={11} /></button>
                    </div>
                  )}
                </div>
              ))}

              {/* Add Point */}
              {addingPointFor === section.id ? (
                <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                  <span style={{ color: 'var(--accent)', marginTop: 6, fontSize: 14 }}>•</span>
                  <input
                    value={newPointText}
                    onChange={(e) => setNewPointText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddPoint(section.id)}
                    placeholder="Type a bullet point..."
                    style={{ flex: 1, fontSize: 12 }}
                    autoFocus
                  />
                  <button className="btn-icon" onClick={() => handleAddPoint(section.id)}><Check size={13} /></button>
                  <button className="btn-icon" onClick={() => { setAddingPointFor(null); setNewPointText(''); }}><X size={13} /></button>
                </div>
              ) : (
                <button className="add-btn" style={{ marginTop: 6 }} onClick={() => { setAddingPointFor(section.id); setNewPointText(''); }}>
                  <Plus size={13} /> Add Point
                </button>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Add New Section */}
      {addingSection ? (
        <div className="item-card">
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>New Section Title</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSection()}
              placeholder="e.g. Projects, Achievements, Hobbies..."
              style={{ flex: 1, fontSize: 13 }}
              autoFocus
            />
            <button className="btn-icon" onClick={handleAddSection}><Check size={14} /></button>
            <button className="btn-icon" onClick={() => { setAddingSection(false); setNewTitle(''); }}><X size={14} /></button>
          </div>
        </div>
      ) : (
        <button className="add-btn" onClick={() => setAddingSection(true)}>
          <Plus size={14} /> Add Custom Section
        </button>
      )}
    </div>
  );
}
