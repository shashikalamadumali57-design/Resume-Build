import { useCV } from '../../context/CVContext';
import { Mail, Phone, MapPin, Globe, Link2 } from 'lucide-react';

function RightSection({ title, color, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.08em', paddingBottom: 5, borderBottom: `1px solid ${color}44`, marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  );
}

function DotSkill({ name, percentage, color }) {
  const dots = 5;
  const filled = Math.round((percentage / 100) * dots);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
      <span style={{ fontSize: 11, color: '#444' }}>{name}</span>
      <div style={{ display: 'flex', gap: 4 }}>
        {Array.from({ length: dots }, (_, i) => (
          <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: i < filled ? color : '#e0e0e0' }} />
        ))}
      </div>
    </div>
  );
}

function LangBar({ name, percentage, level, color }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, color: '#444', fontWeight: 500 }}>{name}</span>
        <span style={{ fontSize: 10, color: '#888' }}>{level}</span>
      </div>
      <div style={{ height: 4, background: '#eee', borderRadius: 99, marginTop: 4 }}>
        <div style={{ height: '100%', width: `${percentage}%`, background: color, borderRadius: 99 }} />
      </div>
    </div>
  );
}

export default function Template2() {
  const { cvData } = useCV();
  const { personal, experience, education, skills, languages, certifications, theme } = cvData;
  const color = theme.primaryColor;
  const fullName = `${personal.firstName} ${personal.lastName}`.trim();

  const fmtDate = (d) => {
    if (!d) return '';
    const [y, m] = d.split('-');
    return `${new Date(y, m - 1).toLocaleString('default', { month: 'short' })} ${y}`;
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#fff', minHeight: '100%' }}>
      {/* HEADER */}
      <div style={{ background: '#1a1a2e', padding: '28px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
            {personal.firstName} <span style={{ color }}>{personal.lastName}</span>
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 4, fontWeight: 400 }}>{personal.jobTitle}</p>
          <div style={{ display: 'flex', gap: 16, marginTop: 12, flexWrap: 'wrap' }}>
            {[{ icon: Mail, text: personal.email }, { icon: Phone, text: personal.phone }, { icon: MapPin, text: personal.address }].map(({ icon: Icon, text }) =>
              text ? (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Icon size={11} color={color} />
                  <span style={{ fontSize: 10, color: '#aaa' }}>{text}</span>
                </div>
              ) : null
            )}
          </div>
        </div>
        {personal.photo ? (
          <div style={{ width: 90, height: 90, borderRadius: '50%', overflow: 'hidden', border: `3px solid ${color}`, flexShrink: 0 }}>
            <img src={personal.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: `${personal.photoSettings?.x || 50}% ${personal.photoSettings?.y || 50}%`, transform: `scale(${personal.photoSettings?.zoom || 1})` }} />
          </div>
        ) : (
          <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 32, color: 'rgba(255,255,255,0.3)' }}>👤</span>
          </div>
        )}
      </div>

      {/* Accent bar */}
      <div style={{ height: 4, background: `linear-gradient(90deg, ${color}, ${color}44)` }} />

      {/* BODY */}
      <div style={{ display: 'flex', padding: '24px 0' }}>
        {/* LEFT - main content */}
        <div style={{ flex: 1, paddingLeft: 36, paddingRight: 24 }}>
          {personal.summary && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: `2px solid ${color}`, paddingBottom: 5, marginBottom: 8 }}>Profile</div>
              <p style={{ fontSize: 11.5, color: '#555', lineHeight: 1.75 }}>{personal.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: `2px solid ${color}`, paddingBottom: 5, marginBottom: 12 }}>Work Experience</div>
              {experience.map((exp, i) => (
                <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? 14 : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{exp.position}</div>
                    <div style={{ fontSize: 10, color: '#999', whiteSpace: 'nowrap', marginLeft: 8 }}>{fmtDate(exp.startDate)} — {exp.current ? 'Present' : fmtDate(exp.endDate)}</div>
                  </div>
                  <div style={{ fontSize: 11, color, fontWeight: 600, marginTop: 1 }}>{exp.company} {exp.location ? `• ${exp.location}` : ''}</div>
                  {exp.description && <div style={{ marginTop: 5, fontSize: 10.5, color: '#555', lineHeight: 1.65, whiteSpace: 'pre-line' }}>{exp.description}</div>}
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: `2px solid ${color}`, paddingBottom: 5, marginBottom: 12 }}>Education</div>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#111' }}>{edu.institution}</div>
                    <div style={{ fontSize: 10, color: '#999' }}>{fmtDate(edu.startDate)} — {fmtDate(edu.endDate)}</div>
                  </div>
                  <div style={{ fontSize: 10.5, color, fontWeight: 600 }}>{edu.degree} {edu.field ? `in ${edu.field}` : ''}</div>
                  {edu.gpa && <div style={{ fontSize: 10, color: '#777', marginTop: 2 }}>GPA: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div style={{ width: 200, paddingRight: 28, paddingLeft: 16, borderLeft: `1px solid #eee`, flexShrink: 0 }}>
          {(personal.website || personal.linkedin) && (
            <RightSection title="Links" color={color}>
              {personal.website && <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}><Globe size={10} color={color} /><span style={{ fontSize: 10, color: '#555' }}>{personal.website}</span></div>}
              {personal.linkedin && <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Link2 size={10} color={color} /><span style={{ fontSize: 10, color: '#555' }}>{personal.linkedin}</span></div>}
            </RightSection>
          )}
          {skills.length > 0 && (
            <RightSection title="Skills" color={color}>
              {skills.map(s => <DotSkill key={s.id} name={s.name} percentage={s.percentage} color={color} />)}
            </RightSection>
          )}
          {languages.length > 0 && (
            <RightSection title="Languages" color={color}>
              {languages.map(l => <LangBar key={l.id} name={l.name} percentage={l.percentage} level={l.level} color={color} />)}
            </RightSection>
          )}
          {certifications.length > 0 && (
            <RightSection title="Certifications" color={color}>
              {certifications.map(c => (
                <div key={c.id} style={{ marginBottom: 8, padding: '6px 8px', background: `${color}0d`, borderRadius: 5 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#333' }}>{c.name}</div>
                  <div style={{ fontSize: 9.5, color: '#777', marginTop: 1 }}>{c.issuer}</div>
                  <div style={{ fontSize: 9, color, marginTop: 2 }}>{c.date}</div>
                </div>
              ))}
            </RightSection>
          )}
        </div>
      </div>
    </div>
  );
}
