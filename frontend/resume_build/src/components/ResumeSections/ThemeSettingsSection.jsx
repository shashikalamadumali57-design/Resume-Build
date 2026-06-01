import { useCV } from '../../context/CVContext';

export default function ThemeSettingsSection() {
  const { cvData, updateTheme } = useCV();
  const { theme } = cvData;

  const colors = [
    { id: 'primaryColor', label: 'Primary (Accent)' },
    { id: 'secondaryColor', label: 'Secondary (Sidebar)' },
    { id: 'backgroundColor', label: 'Background' },
    { id: 'textColor', label: 'Text Color' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
      {colors.map((c) => (
        <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--card2)', borderRadius: 6, border: '1px solid var(--border)' }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{c.label}</span>
          <input
            type="color"
            value={theme[c.id]}
            onChange={(e) => updateTheme(c.id, e.target.value)}
            style={{ width: 32, height: 32, padding: 0, border: 'none', borderRadius: 4, cursor: 'pointer', background: 'transparent' }}
          />
        </div>
      ))}
    </div>
  );
}
