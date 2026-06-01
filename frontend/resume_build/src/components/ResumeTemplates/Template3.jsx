import { useCV } from '../../context/CVContext';
import { Mail, Phone, MapPin, Globe, Star } from 'lucide-react';

function CircleRing({ pct, color, size = 52 }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f0f0f0" strokeWidth={4} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={4}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`} />
      <text x="50%" y="55%" textAnchor="middle" fontSize={size * 0.2} fill={color} fontWeight="700">{pct}%</text>
    </svg>
  );
}

export default function Template3() {
  const { cvData } = useCV();
  const { personal, experience, education, skills, languages, certifications, theme } = cvData;
  const color = theme.primaryColor;
  const fullName = `${personal.firstName} ${personal.lastName}`.trim();

  const fmtDate = (d) => {
    if (!d) return '';
    const [y, m] = d.split('-');
    return `${new Date(y, m - 1).toLocaleString('default', { month: 'short' })} ${y}`;
  };

  const SHead = ({ children }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
      <div style={{ width: 4, height: 20, background: color, borderRadius: 2 }} />
      <div style={{ fontSize: 13, fontWeight: 800, color: '#111', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{children}</div>
    </div>
  );

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#fafafa', minHeight: '100%' }}>
      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, #111827 60%, ${color})`, padding: '32px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 160, height: 160, borderRadius: '50%', background: `${color}22` }} />
        <div style={{ position: 'absolute', bottom: -20, right: 80, width: 80, height: 80, borderRadius: '50%', background: `${color}15` }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 24, position: 'relative', zIndex: 1 }}>
          {personal.photo ? (
            <div style={{ width: 100, height: 100, borderRadius: 16, overflow: 'hidden', border: `3px solid ${color}`, flexShrink: 0 }}>
              <img src={personal.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: `${personal.photoSettings?.x || 50}% ${personal.photoSettings?.y || 50}%`, transform: `scale(${personal.photoSettings?.zoom || 1})` }} />
            </div>
          ) : (
            <div style={{ width: 100, height: 100, borderRadius: 16, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 40, color: 'rgba(255,255,255,0.3)' }}>👤</span>
            </div>
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 30, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>{fullName || 'Your Name'}</h1>
            <div style={{ display: 'inline-block', background: color, padding: '3px 12px', borderRadius: 99, fontSize: 11, fontWeight: 600, color: '#fff', marginTop: 6 }}>{personal.jobTitle}</div>
            <div style={{ display: 'flex', gap: 20, marginTop: 12, flexWrap: 'wrap' }}>
              {[{ icon: Mail, text: personal.email }, { icon: Phone, text: personal.phone }, { icon: MapPin, text: personal.address }, { icon: Globe, text: personal.website }].map(({ icon: Icon, text }) =>
                text ? (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Icon size={11} color={color} />
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>{text}</span>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ display: 'flex', gap: 0 }}>
        {/* LEFT */}
        <div style={{ flex: 1, padding: '28px 24px 28px 36px' }}>
          {personal.summary && (
            <div style={{ marginBottom: 22 }}>
              <SHead>About Me</SHead>
              <p style={{ fontSize: 11.5, color: '#555', lineHeight: 1.75, marginLeft: 14 }}>{personal.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: 22 }}>
              <SHead>Experience</SHead>
              <div style={{ marginLeft: 14 }}>
                {experience.map((exp, i) => (
                  <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? 18 : 0, paddingBottom: i < experience.length - 1 ? 18 : 0, borderBottom: i < experience.length - 1 ? '1px dashed #e0e0e0' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{exp.position}</div>
                        <div style={{ fontSize: 11, fontWeight: 600, color, marginTop: 2 }}>{exp.company} {exp.location ? `• ${exp.location}` : ''}</div>
                      </div>
                      <div style={{ fontSize: 10, color: '#fff', background: color, padding: '2px 9px', borderRadius: 99, whiteSpace: 'nowrap', marginLeft: 8, fontWeight: 500 }}>
                        {fmtDate(exp.startDate)} — {exp.current ? 'Present' : fmtDate(exp.endDate)}
                      </div>
                    </div>
                    {exp.description && <div style={{ marginTop: 8, fontSize: 10.5, color: '#555', lineHeight: 1.65, whiteSpace: 'pre-line' }}>{exp.description}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <SHead>Education</SHead>
              <div style={{ marginLeft: 14 }}>
                {education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#111' }}>{edu.institution}</div>
                        <div style={{ fontSize: 10.5, color, fontWeight: 600 }}>{edu.degree} {edu.field ? `in ${edu.field}` : ''}</div>
                        {edu.gpa && <div style={{ fontSize: 10, color: '#777', marginTop: 1 }}>GPA: {edu.gpa}</div>}
                      </div>
                      <div style={{ fontSize: 10, color: '#888', whiteSpace: 'nowrap', marginLeft: 8 }}>
                        {fmtDate(edu.startDate)} — {fmtDate(edu.endDate)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div style={{ width: 220, background: '#fff', borderLeft: `3px solid ${color}`, padding: '28px 20px', flexShrink: 0 }}>
          {skills.length > 0 && (
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Skills</div>
              {skills.map(s => (
                <div key={s.id} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: 11, color: '#333', fontWeight: 500 }}>{s.name}</span>
                    <span style={{ fontSize: 10, color, fontWeight: 700 }}>{s.percentage}%</span>
                  </div>
                  <div style={{ height: 5, background: '#f0f0f0', borderRadius: 99 }}>
                    <div style={{ height: '100%', width: `${s.percentage}%`, background: `linear-gradient(90deg, ${color}99, ${color})`, borderRadius: 99 }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Languages</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {languages.map(l => (
                  <div key={l.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <CircleRing pct={l.percentage} color={color} size={52} />
                    <div style={{ fontSize: 10, fontWeight: 600, color: '#333', textAlign: 'center' }}>{l.name}</div>
                    <div style={{ fontSize: 9, color: '#888', textAlign: 'center' }}>{l.level}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Certificates</div>
              {certifications.map(c => (
                <div key={c.id} style={{ marginBottom: 10, padding: '7px 10px', background: `${color}0d`, borderRadius: 8, borderLeft: `3px solid ${color}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
                    <Star size={9} color={color} fill={color} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#222' }}>{c.name}</span>
                  </div>
                  <div style={{ fontSize: 9.5, color: '#666' }}>{c.issuer}</div>
                  <div style={{ fontSize: 9, color, marginTop: 2 }}>{c.date}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
