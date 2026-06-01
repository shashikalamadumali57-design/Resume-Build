import { useCV } from '../../context/CVContext';
import { Mail, Phone, MapPin, Globe, Link2 } from 'lucide-react';

function SkillBar({ name, percentage, color }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: '#e0e0e0', fontWeight: 500 }}>{name}</span>
        <span style={{ fontSize: 10, color: color, fontWeight: 700 }}>{percentage}%</span>
      </div>
      <div style={{ height: 5, background: 'rgba(255,255,255,0.12)', borderRadius: 99 }}>
        <div style={{ height: '100%', width: `${percentage}%`, background: color, borderRadius: 99 }} />
      </div>
    </div>
  );
}

function LangCircle({ name, percentage, level, color }) {
  const r = 20, circ = 2 * Math.PI * r;
  const dash = (percentage / 100) * circ;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
      <svg width={48} height={48} viewBox="0 0 48 48">
        <circle cx={24} cy={24} r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={3.5} />
        <circle cx={24} cy={24} r={r} fill="none" stroke={color} strokeWidth={3.5}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform="rotate(-90 24 24)" />
        <text x="50%" y="55%" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="700">{percentage}%</text>
      </svg>
      <div>
        <div style={{ fontSize: 11, color: '#e0e0e0', fontWeight: 600 }}>{name}</div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 1 }}>{level}</div>
      </div>
    </div>
  );
}

function SectionTitle({ children, color }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 800, color, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12, paddingBottom: 6, borderBottom: `2px solid ${color}` }}>
      {children}
    </div>
  );
}

function ContactItem({ icon: Icon, text, color }) {
  if (!text) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
      <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <Icon size={11} color={color} />
      </div>
      <span style={{ fontSize: 10, color: '#f0f0f0', wordBreak: 'break-all' }}>{text}</span>
    </div>
  );
}

export default function Template1() {
  const { cvData } = useCV();
  const { personal, experience, education, skills, languages, certifications, theme } = cvData;
  const { theme: { primaryColor, secondaryColor, backgroundColor, textColor } } = cvData;
  const fullName = `${personal.firstName} ${personal.lastName}`.trim();

  const fmtDate = (d) => {
    if (!d) return '';
    const [y, m] = d.split('-');
    return `${new Date(y, m - 1).toLocaleString('default', { month: 'short' })} ${y}`;
  };

  return (
    <div style={{ display: 'flex', minHeight: '100%', flex: 1, fontFamily: 'Inter, sans-serif', background: backgroundColor }}>
      {/* ── SIDEBAR ── */}
      <div style={{ width: '38%', background: `linear-gradient(160deg, ${primaryColor}ee, ${secondaryColor}ee)`, padding: '36px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Photo + Name */}
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          {personal.photo ? (
            <div style={{ width: 100, height: 100, borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(255,255,255,0.4)', margin: '0 auto' }}>
              <img src={personal.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: `${personal.photoSettings?.x || 50}% ${personal.photoSettings?.y || 50}%`, transform: `scale(${personal.photoSettings?.zoom || 1})` }} />
            </div>
          ) : (
            <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 36, color: 'rgba(255,255,255,0.6)' }}>👤</span>
            </div>
          )}
        </div>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.2 }}>{fullName || 'Your Name'}</h1>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 4, fontWeight: 500 }}>{personal.jobTitle}</p>
        </div>

        {/* Contact */}
        <div>
          <SectionTitle color="rgba(255,255,255,0.9)">Contact</SectionTitle>
          <ContactItem icon={Mail} text={personal.email} color={primaryColor} />
          <ContactItem icon={Phone} text={personal.phone} color={primaryColor} />
          <ContactItem icon={MapPin} text={personal.address} color={primaryColor} />
          <ContactItem icon={Globe} text={personal.website} color={primaryColor} />
          <ContactItem icon={Link2} text={personal.linkedin} color={primaryColor} />
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <SectionTitle color="rgba(255,255,255,0.9)">Skills</SectionTitle>
            {skills.map(s => <SkillBar key={s.id} name={s.name} percentage={s.percentage} color="rgba(255,255,255,0.9)" />)}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <SectionTitle color="rgba(255,255,255,0.9)">Languages</SectionTitle>
            {languages.map(l => <LangCircle key={l.id} name={l.name} percentage={l.percentage} level={l.level} color="rgba(255,255,255,0.9)" />)}
          </div>
        )}
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, padding: '36px 28px', background: backgroundColor, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Summary */}
        {personal.summary && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: primaryColor, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8, borderBottom: `2px solid ${primaryColor}`, paddingBottom: 5 }}>Profile</div>
            <p style={{ fontSize: 11.5, color: textColor, lineHeight: 1.7, opacity: 0.8 }}>{personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: primaryColor, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12, borderBottom: `2px solid ${primaryColor}`, paddingBottom: 5 }}>Experience</div>
            {experience.map((exp, i) => (
              <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? 16 : 0, paddingLeft: 14, borderLeft: `2px solid ${primaryColor}22`, position: 'relative' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: primaryColor, position: 'absolute', left: -5, top: 4 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: textColor }}>{exp.position}</div>
                    <div style={{ fontSize: 11, color: primaryColor, fontWeight: 600, marginTop: 1 }}>{exp.company} {exp.location ? `· ${exp.location}` : ''}</div>
                  </div>
                  <div style={{ fontSize: 10, color: textColor, opacity: 0.6, whiteSpace: 'nowrap', marginLeft: 8 }}>
                    {fmtDate(exp.startDate)} — {exp.current ? 'Present' : fmtDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <div style={{ marginTop: 6, fontSize: 10.5, color: textColor, opacity: 0.75, lineHeight: 1.65, whiteSpace: 'pre-line' }}>{exp.description}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: primaryColor, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12, borderBottom: `2px solid ${primaryColor}`, paddingBottom: 5 }}>Education</div>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: 12, paddingLeft: 14, borderLeft: `2px solid ${primaryColor}22`, position: 'relative' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: primaryColor, position: 'absolute', left: -5, top: 4 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: textColor }}>{edu.institution}</div>
                    <div style={{ fontSize: 10.5, color: primaryColor, fontWeight: 600 }}>{edu.degree} {edu.field ? `in ${edu.field}` : ''}</div>
                    {edu.gpa && <div style={{ fontSize: 10, color: textColor, opacity: 0.6, marginTop: 2 }}>GPA: {edu.gpa}</div>}
                  </div>
                  <div style={{ fontSize: 10, color: textColor, opacity: 0.6, whiteSpace: 'nowrap' }}>
                    {fmtDate(edu.startDate)} — {fmtDate(edu.endDate)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: primaryColor, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10, borderBottom: `2px solid ${primaryColor}`, paddingBottom: 5 }}>Certifications</div>
            {certifications.map((c) => (
              <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, padding: '6px 10px', background: `${primaryColor}0d`, borderRadius: 6, borderLeft: `3px solid ${primaryColor}` }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: textColor }}>{c.name}</div>
                  <div style={{ fontSize: 10, color: textColor, opacity: 0.7 }}>{c.issuer}</div>
                </div>
                <div style={{ fontSize: 10, color: primaryColor, fontWeight: 600 }}>{c.date}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
