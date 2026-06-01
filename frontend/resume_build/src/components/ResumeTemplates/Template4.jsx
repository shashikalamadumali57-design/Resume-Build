import { useCV } from '../../context/CVContext';
import { Mail, Phone, MapPin, Globe, Link2 } from 'lucide-react';

function SectionTitle({ children, color }) {
  return (
    <div style={{ 
      fontSize: 14, 
      fontWeight: 700, 
      color: '#333',
      textTransform: 'uppercase', 
      letterSpacing: '0.15em', 
      marginBottom: 16, 
      borderBottom: `1px solid ${color}`,
      paddingBottom: 8,
      marginTop: 24
    }}>
      {children}
    </div>
  );
}

function ContactItem({ icon: Icon, text }) {
  if (!text) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <Icon size={12} color="#666" />
      <span style={{ fontSize: 11, color: '#555' }}>{text}</span>
    </div>
  );
}

export default function Template4() {
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
    <div style={{ minHeight: '100%', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', padding: '40px 50px', background: '#fff' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        {personal.photo && (
          <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 16px', display: 'block' }}>
            <img src={personal.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: `${personal.photoSettings?.x || 50}% ${personal.photoSettings?.y || 50}%`, transform: `scale(${personal.photoSettings?.zoom || 1})` }} />
          </div>
        )}
        <h1 style={{ fontSize: 32, fontWeight: 300, color: '#222', margin: 0, letterSpacing: '0.05em' }}>{fullName || 'Your Name'}</h1>
        <p style={{ fontSize: 14, color, marginTop: 8, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{personal.jobTitle}</p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, marginTop: 16 }}>
          <ContactItem icon={Mail} text={personal.email} />
          <ContactItem icon={Phone} text={personal.phone} />
          <ContactItem icon={MapPin} text={personal.address} />
          <ContactItem icon={Globe} text={personal.website} />
          <ContactItem icon={Link2} text={personal.linkedin} />
        </div>
      </div>

      {/* Profile */}
      {personal.summary && (
        <div style={{ textAlign: 'center', maxWidth: '90%', margin: '0 auto 30px' }}>
          <p style={{ fontSize: 12, color: '#555', lineHeight: 1.8 }}>{personal.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <SectionTitle color={color}>Experience</SectionTitle>
          {experience.map((exp, i) => (
            <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? 20 : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#222' }}>{exp.position}</div>
                <div style={{ fontSize: 11, color: '#777', fontWeight: 500 }}>
                  {fmtDate(exp.startDate)} — {exp.current ? 'Present' : fmtDate(exp.endDate)}
                </div>
              </div>
              <div style={{ fontSize: 12, color, fontWeight: 500, marginBottom: 8 }}>
                {exp.company} {exp.location ? `| ${exp.location}` : ''}
              </div>
              {exp.description && (
                <div style={{ fontSize: 11, color: '#555', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{exp.description}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <SectionTitle color={color}>Education</SectionTitle>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#222' }}>{edu.institution}</div>
                <div style={{ fontSize: 11, color: '#777' }}>
                  {fmtDate(edu.startDate)} — {fmtDate(edu.endDate)}
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#555' }}>
                <span style={{ fontWeight: 500, color }}>{edu.degree}</span> {edu.field ? `in ${edu.field}` : ''}
              </div>
              {edu.gpa && <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Skills & Languages (2 Columns) */}
      <div style={{ display: 'flex', gap: 40 }}>
        {skills.length > 0 && (
          <div style={{ flex: 1 }}>
            <SectionTitle color={color}>Skills</SectionTitle>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {skills.map(s => (
                <div key={s.id} style={{ padding: '6px 12px', background: '#f5f5f5', borderRadius: 4, fontSize: 11, color: '#333', fontWeight: 500, border: '1px solid #eaeaea' }}>
                  {s.name}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {languages.length > 0 && (
          <div style={{ flex: 1 }}>
            <SectionTitle color={color}>Languages</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {languages.map(l => (
                <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                  <span style={{ fontWeight: 600, color: '#333' }}>{l.name}</span>
                  <span style={{ color: '#777' }}>{l.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Certifications */}
      {certifications.length > 0 && (
        <div>
          <SectionTitle color={color}>Certifications</SectionTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            {certifications.map((c) => (
              <div key={c.id} style={{ flex: '1 1 calc(50% - 20px)', minWidth: 200 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#222' }}>{c.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ fontSize: 11, color }}>{c.issuer}</span>
                  <span style={{ fontSize: 10, color: '#888' }}>{c.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
