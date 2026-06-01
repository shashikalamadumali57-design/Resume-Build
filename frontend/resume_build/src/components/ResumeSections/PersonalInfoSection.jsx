import { useRef } from 'react';
import { Camera } from 'lucide-react';
import { useCV } from '../../context/CVContext';

export default function PersonalInfoSection() {
  const { cvData, updatePersonal, updatePhotoSettings } = useCV();
  const { personal } = cvData;
  const { photoSettings } = personal;
  const fileRef = useRef();

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => updatePersonal('photo', ev.target.result);
    reader.readAsDataURL(file);
  };

  const field = (label, key, type = 'text', placeholder = '') => (
    <div className="form-group">
      <label>{label}</label>
      <input type={type} value={personal[key] || ''} placeholder={placeholder}
        onChange={(e) => updatePersonal(key, e.target.value)} />
    </div>
  );

  return (
    <div style={{ paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Photo Upload */}
      <div
        className="photo-upload-area"
        onClick={() => fileRef.current.click()}
        title="Click to upload photo"
      >
        {personal.photo ? (
          <img src={personal.photo} className="photo-preview" alt="Profile" />
        ) : (
          <div className="photo-placeholder">
            <Camera size={28} />
          </div>
        )}
        <div className="photo-upload-text">
          <strong>Click to upload photo</strong><br />
          JPG, PNG supported
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhoto} />
      </div>

      {personal.photo && photoSettings && (
        <div style={{ background: 'var(--card)', padding: 12, borderRadius: 6, border: '1px solid var(--border)', marginTop: 4 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>Photo Adjustments</div>
          
          <div className="form-group" style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)' }}>
              <span>Zoom</span>
              <span>{photoSettings.zoom}x</span>
            </div>
            <input type="range" min="0.5" max="3" step="0.1" value={photoSettings.zoom} onChange={(e) => updatePhotoSettings('zoom', parseFloat(e.target.value))} style={{ width: '100%' }} />
          </div>

          <div className="form-group" style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)' }}>
              <span>Horizontal Position</span>
              <span>{photoSettings.x}%</span>
            </div>
            <input type="range" min="0" max="100" step="1" value={photoSettings.x} onChange={(e) => updatePhotoSettings('x', parseInt(e.target.value))} style={{ width: '100%' }} />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)' }}>
              <span>Vertical Position</span>
              <span>{photoSettings.y}%</span>
            </div>
            <input type="range" min="0" max="100" step="1" value={photoSettings.y} onChange={(e) => updatePhotoSettings('y', parseInt(e.target.value))} style={{ width: '100%' }} />
          </div>
        </div>
      )}

      <div className="form-grid">
        {field('First Name', 'firstName', 'text', 'John')}
        {field('Last Name', 'lastName', 'text', 'Doe')}
        <div className="form-group full">
          {field('Job Title', 'jobTitle', 'text', 'Full Stack Developer')}
        </div>
        {field('Email', 'email', 'email', 'john@example.com')}
        {field('Phone', 'phone', 'tel', '+1 555 000 0000')}
        <div className="form-group full">
          {field('Address', 'address', 'text', 'New York, NY, USA')}
        </div>
        {field('Website', 'website', 'text', 'yoursite.com')}
        {field('LinkedIn', 'linkedin', 'text', 'linkedin.com/in/you')}
      </div>

      <div className="form-group">
        <label>Professional Summary</label>
        <textarea
          rows={4}
          value={personal.summary || ''}
          placeholder="Write a brief summary about yourself..."
          onChange={(e) => updatePersonal('summary', e.target.value)}
        />
      </div>
    </div>
  );
}
