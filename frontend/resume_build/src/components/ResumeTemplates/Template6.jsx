import { useCV } from '../../context/CVContext';
import { Mail, Phone, MapPin, Globe, Link2 } from 'lucide-react';

function SectionTitle({ children, color }) {
  return (
    <div style={{ 
      fontSize: 14, 
      fontWeight: 800, 
      color: color, 
      letterSpacing: '0.15em', 
      textTransform: 'uppercase', 
      marginBottom: 20, 
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }}>
      {children}
      <div style={{ flex: 1, height: 1, background: `${color}44` }} />
    </div>
  );
}

function ContactItem({ icon: Icon, text }) {
  if (!text) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
      <Icon size={12} color="rgba(255,255,255,0.7)" />
      <span style={{ fontSize: 11, color: '#f0f0f0', wordBreak: 'break-all' }}>{text}</span>
    </div>
  );
}

function SkillPill({ name, color }) {
  return (
    <div style={{ 
      padding: '4px 10px', 
      background: 'rgba(255,255,255,0.1)', 
      border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: 20, 
      fontSize: 10, 
      color: '#fff', 
      fontWeight: 500 
    }}>
      {name}
    </div>
  );
}

export default function Template6() {
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
    <div style={{ minHeight: '100%', fontFamily: '"Montserrat", sans-serif', display: 'flex' }}>
      
      {/* Sidebar (Dark Gradient) */}
      <div style={{ width: '35%', background: `linear-gradient(135deg, #1f2125, #111)`, padding: '40px 30px', color: '#fff', display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          {personal.photo && (
            <div style={{ width: 120, height: 120, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px', border: `3px solid ${color}` }}>
              <img src={personal.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: `${personal.photoSettings?.x || 50}% ${personal.photoSettings?.y || 50}%`, transform: `scale(${personal.photoSettings?.zoom || 1})` }} />
            </div>
          )}
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>{personal.firstName}<br/><span style={{ color }}>{personal.lastName}</span></h1>
          <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 12, opacity: 0.8 }}>{personal.jobTitle}</p>
        </div>

        {/* Contact */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Contact Info</div>
          <ContactItem icon={Mail} text={personal.email} />
          <ContactItem icon={Phone} text={personal.phone} />
          <ContactItem icon={MapPin} text={personal.address} />
          <ContactItem icon={Globe} text={personal.website} />
          <ContactItem icon={Link2} text={personal.linkedin} />
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Expertise</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {skills.map(s => <SkillPill key={s.id} name={s.name} color={color} />)}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Languages</div>
            {languages.map(l => (
              <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 11 }}>
                <span style={{ fontWeight: 600 }}>{l.name}</span>
                <span style={{ color: color }}>{l.level}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content (Timeline based) */}
      <div style={{ flex: 1, padding: '40px', background: '#fcfcfc' }}>
        
        {/* Profile */}
        {personal.summary && (
          <div style={{ marginBottom: 40 }}>
            <SectionTitle color={color}>Profile</SectionTitle>
            <p style={{ fontSize: 12, color: '#555', lineHeight: 1.8 }}>{personal.summary}</p>
          </div>
        )}

        {/* Experience Timeline */}
        {experience.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <SectionTitle color={color}>Experience</SectionTitle>
            <div style={{ position: 'relative', paddingLeft: 20 }}>
              {/* Vertical line */}
              <div style={{ position: 'absolute', left: 4, top: 6, bottom: 0, width: 2, background: `${color}33` }} />
              
              {experience.map((exp, i) => (
                <div key={exp.id} style={{ position: 'relative', marginBottom: i < experience.length - 1 ? 28 : 0 }}>
                  {/* Timeline dot */}
                  <div style={{ position: 'absolute', left: -21, top: 4, width: 10, height: 10, borderRadius: '50%', background: '#fff', border: `2px solid ${color}` }} />
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#222' }}>{exp.position}</div>
                    <div style={{ fontSize: 11, color: color, fontWeight: 600 }}>
                      {fmtDate(exp.startDate)} — {exp.current ? 'Present' : fmtDate(exp.endDate)}
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: '#666', fontWeight: 500, marginBottom: 8 }}>
                    {exp.company} {exp.location ? `· ${exp.location}` : ''}
                  </div>
                  {exp.description && (
                    <div style={{ fontSize: 11, color: '#555', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{exp.description}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Timeline */}
        {education.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <SectionTitle color={color}>Education</SectionTitle>
            <div style={{ position: 'relative', paddingLeft: 20 }}>
              <div style={{ position: 'absolute', left: 4, top: 6, bottom: 0, width: 2, background: `${color}33` }} />
              
              {education.map((edu, i) => (
                <div key={edu.id} style={{ position: 'relative', marginBottom: i < education.length - 1 ? 24 : 0 }}>
                  <div style={{ position: 'absolute', left: -21, top: 4, width: 10, height: 10, borderRadius: '50%', background: '#fff', border: `2px solid ${color}` }} />
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#222' }}>{edu.institution}</div>
                    <div style={{ fontSize: 11, color: color, fontWeight: 600 }}>
                      {fmtDate(edu.startDate)} — {fmtDate(edu.endDate)}
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: '#555' }}>
                    <span style={{ fontWeight: 600 }}>{edu.degree}</span> {edu.field ? `in ${edu.field}` : ''}
                  </div>
                  {edu.gpa && <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>GPA: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <SectionTitle color={color}>Certifications</SectionTitle>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              {certifications.map((c) => (
                <div key={c.id} style={{ flex: '1 1 calc(50% - 16px)', minWidth: 200, padding: 12, background: '#fff', border: '1px solid #eee', borderRadius: 6, borderLeft: `4px solid ${color}` }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#333' }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: '#666', marginTop: 4 }}>{c.issuer}</div>
                  <div style={{ fontSize: 10, color: '#999', marginTop: 2 }}>{c.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}
