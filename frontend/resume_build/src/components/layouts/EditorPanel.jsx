import { useState } from 'react';
import { User, Briefcase, GraduationCap, Zap, Globe, Award, ChevronDown, Palette } from 'lucide-react';
import PersonalInfoSection from '../ResumeSections/PersonalInfoSection';
import ExperienceSection from '../ResumeSections/ExperienceSection';
import EducationSection from '../ResumeSections/EducationSection';
import SkillsSection from '../ResumeSections/SkillsSection';
import LanguagesSection from '../ResumeSections/LanguagesSection';
import CertificationsSection from '../ResumeSections/CertificationsSection';
import ThemeSettingsSection from '../ResumeSections/ThemeSettingsSection';

const SECTIONS = [
  { id: 'personal', label: 'Personal Info', icon: User, component: PersonalInfoSection },
  { id: 'experience', label: 'Work Experience', icon: Briefcase, component: ExperienceSection },
  { id: 'education', label: 'Education', icon: GraduationCap, component: EducationSection },
  { id: 'skills', label: 'Skills', icon: Zap, component: SkillsSection },
  { id: 'languages', label: 'Languages', icon: Globe, component: LanguagesSection },
  { id: 'certifications', label: 'Certifications', icon: Award, component: CertificationsSection },
  { id: 'theme', label: 'Theme Colors', icon: Palette, component: ThemeSettingsSection },
];

export default function EditorPanel() {
  const [open, setOpen] = useState('personal');

  return (
    <div className="editor-panel no-print">
      <div className="editor-scroll">
        {SECTIONS.map(({ id, label, icon: Icon, component: Component }) => {
          const isOpen = open === id;
          return (
            <div key={id} className="accordion">
              <div className="accordion-header" onClick={() => setOpen(isOpen ? null : id)}>
                <div className="accordion-icon">
                  <Icon size={15} />
                </div>
                <span className="accordion-title">{label}</span>
                <ChevronDown
                  size={16}
                  className={`accordion-chevron ${isOpen ? 'open' : ''}`}
                />
              </div>
              {isOpen && (
                <div className="accordion-body">
                  <Component />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
