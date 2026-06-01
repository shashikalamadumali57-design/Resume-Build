import { useCV } from '../../context/CVContext';
import { Mail, Phone, MapPin, Globe, Link2 } from 'lucide-react';

function SectionTitle({ children, color, align = 'left', dark = false }) {
  return (
    <div style={{ 
      fontSize: 13, 
      fontWeight: 800, 
      color: dark ? '#fff' : color, 
      textTransform: 'uppercase', 
      letterSpacing: '0.1em', 
      marginBottom: 16, 
      textAlign: align,
      position: 'relative',
      paddingBottom: 8
    }}>
      {children}
      <div style={{ 
        position: 'absolute', 
        bottom: 0, 
        [align === 'right' ? 'right' : 'left']: 0, 
        width: 30, 
        height: 3, 
        background: dark ? 'rgba(255,255,255,0.3)' : color 
      }} />
    </div>
  );
}

function ContactItem({ icon: Icon, text, dark = false }) {
  if (!text) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
      <div style={{ width: 26, height: 26, borderRadius: 4, background: dark ? 'rgba(255,255,255,0.1)' : '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={12} color={dark ? '#fff' : '#444'} />
      </div>
      <span style={{ fontSize: 11, color: dark ? '#eee' : '#555', wordBreak: 'break-all' }}>{text}</span>
    </div>
  );
}

function SkillItem({ name, percentage, color }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: '#fff', fontWeight: 600 }}>{name}</span>
      </div>
      <div style={{ height: 4, background: 'rgba(255,255,255,0.2)' }}>
        <div style={{ height: '100%', width: `${percentage}%`, background: '#fff' }} />
      </div>
    </div>
  );
}

export default function Template5() {
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
    <div style={{ minHeight: '100%', fontFamily: '"Roboto", sans-serif', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Header */}
      <div style={{ background: color, padding: '40px 40px 30px', display: 'flex', alignItems: 'center', gap: 30, color: '#fff' }}>
        {personal.photo && (
          <div style={{ width: 110, height: 110, borderRadius: 8, overflow: 'hidden', border: '3px solid rgba(255,255,255,0.5)' }}>
            <img src={personal.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: `${personal.photoSettings?.x || 50}% ${personal.photoSettings?.y || 50}%`, transform: `scale(${personal.photoSettings?.zoom || 1})` }} />
          </div>
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>{fullName || 'Your Name'}</h1>
          <p style={{ fontSize: 16, fontWeight: 400, marginTop: 4, opacity: 0.9 }}>{personal.jobTitle}</p>
          {personal.summary && (
            <p style={{ fontSize: 11.5, lineHeight: 1.6, marginTop: 16, opacity: 0.85, maxWidth: '90%' }}>
              {personal.summary}
            </p>
          )}
        </div>
      </div>

      {/* Main Layout (Content Left, Sidebar Right) */}
      <div style={{ display: 'flex', flex: 1 }}>
        
        {/* Left Column (Main Content) */}
        <div style={{ flex: 1, padding: '40px', background: '#fff' }}>
          
          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: 30 }}>
              <SectionTitle color={color}>Experience</SectionTitle>
              {experience.map((exp, i) => (
                <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? 24 : 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#222' }}>{exp.position}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2, marginBottom: 8 }}>
                    <div style={{ fontSize: 12, color, fontWeight: 600 }}>{exp.company}</div>
                    <div style={{ fontSize: 11, color: '#888', background: '#f5f5f5', padding: '2px 8px', borderRadius: 4 }}>
                      {fmtDate(exp.startDate)} — {exp.current ? 'Present' : fmtDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.description && (
                    <div style={{ fontSize: 11.5, color: '#444', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{exp.description}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <SectionTitle color={color}>Education</SectionTitle>
              {education.map((edu, i) => (
                <div key={edu.id} style={{ marginBottom: i < education.length - 1 ? 20 : 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#222' }}>{edu.institution}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                    <div style={{ fontSize: 12, color: '#555' }}>
                      <span style={{ fontWeight: 600 }}>{edu.degree}</span> {edu.field ? `in ${edu.field}` : ''}
                    </div>
                    <div style={{ fontSize: 11, color: '#888' }}>
                      {fmtDate(edu.startDate)} — {fmtDate(edu.endDate)}
                    </div>
                  </div>
                  {edu.gpa && <div style={{ fontSize: 11, color: '#777', marginTop: 4 }}>GPA: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Right Sidebar */}
        <div style={{ width: '32%', background: '#22252a', padding: '40px 30px' }}>
          
          {/* Contact */}
          <div style={{ marginBottom: 35 }}>
            <SectionTitle color={color} dark>Contact</SectionTitle>
            <ContactItem icon={Mail} text={personal.email} dark />
            <ContactItem icon={Phone} text={personal.phone} dark />
            <ContactItem icon={MapPin} text={personal.address} dark />
            <ContactItem icon={Globe} text={personal.website} dark />
            <ContactItem icon={Link2} text={personal.linkedin} dark />
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ marginBottom: 35 }}>
              <SectionTitle color={color} dark>Skills</SectionTitle>
              {skills.map(s => <SkillItem key={s.id} name={s.name} percentage={s.percentage} color={color} />)}
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div style={{ marginBottom: 35 }}>
              <SectionTitle color={color} dark>Languages</SectionTitle>
              {languages.map(l => (
                <div key={l.id} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12, color: '#fff', fontWeight: 600 }}>{l.name}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>{l.level}</div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <SectionTitle color={color} dark>Certifications</SectionTitle>
              {certifications.map((c) => (
                <div key={c.id} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>{c.name}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{c.issuer} • {c.date}</div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
