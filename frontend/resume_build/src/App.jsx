import './index.css';
import './App.css';
import { CVProvider, useCV } from './context/CVContext';
import Toolbar from './components/layouts/Toolbar';
import EditorPanel from './components/layouts/EditorPanel';
import Template1 from './components/ResumeTemplates/Template1';
import Template2 from './components/ResumeTemplates/Template2';
import Template3 from './components/ResumeTemplates/Template3';
import Template4 from './components/ResumeTemplates/Template4';
import Template5 from './components/ResumeTemplates/Template5';
import Template6 from './components/ResumeTemplates/Template6';

const TEMPLATES = {
  template1: Template1,
  template2: Template2,
  template3: Template3,
  template4: Template4,
  template5: Template5,
  template6: Template6,
};

function CVPreview() {
  const { cvData } = useCV();
  const ActiveTemplate = TEMPLATES[cvData.selectedTemplate] || Template1;
  return (
    <div className="preview-panel">
      <div className="cv-paper" id="cv-paper">
        <ActiveTemplate />
      </div>
    </div>
  );
}

function CVBuilder() {
  return (
    <>
      <Toolbar />
      <div className="builder-layout">
        <EditorPanel />
        <CVPreview />
      </div>
    </>
  );
}

export default function App() {
  return (
    <CVProvider>
      <CVBuilder />
    </CVProvider>
  );
}
