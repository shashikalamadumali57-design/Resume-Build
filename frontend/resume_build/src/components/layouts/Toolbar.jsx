import { FileText, Download, Palette } from 'lucide-react';
import { useCV } from '../../context/CVContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const TEMPLATES = [
  { id: 'template1', label: 'Modern Pro' },
  { id: 'template2', label: 'Executive' },
  { id: 'template3', label: 'Creative' },
  { id: 'template4', label: 'Minimalist' },
  { id: 'template5', label: 'Split Right' },
  { id: 'template6', label: 'Timeline' },
];

export default function Toolbar() {
  const { cvData, setTemplate, updateTheme } = useCV();

  const handleDownload = async () => {
    const el = document.getElementById('cv-paper');
    if (!el) return;
    try {
      const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = (canvas.height * pdfW) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfW, pdfH);
      pdf.save(`${cvData.personal.firstName}_${cvData.personal.lastName}_CV.pdf`);
    } catch (e) {
      console.error(e);
      window.print();
    }
  };

  return (
    <div className="toolbar no-print">
      <div className="toolbar-brand">
        <div className="brand-icon">
          <FileText size={18} color="#fff" />
        </div>
        CV<span>Forge</span>
      </div>
      <div className="toolbar-sep" />
      <div className="toolbar-center">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            className={`template-tab ${cvData.selectedTemplate === t.id ? 'active' : ''}`}
            onClick={() => setTemplate(t.id)}
          >
            <TemplateThumbnail id={t.id} />
            {t.label}
          </button>
        ))}
      </div>
      <div className="toolbar-right">
        <div className="toolbar-sep" />
        <button className="download-btn" onClick={handleDownload}>
          <Download size={15} />
          Download PDF
        </button>
      </div>
    </div>
  );
}

function TemplateThumbnail({ id }) {
  if (id === 'template1') return (
    <div className="template-thumb">
      <div className="thumb-sidebar" style={{ width: 10 }} />
      <div className="thumb-content">
        {[18, 14, 16, 12, 14].map((w, i) => (
          <div key={i} className="thumb-line" style={{ width: w }} />
        ))}
      </div>
    </div>
  );
  if (id === 'template2') return (
    <div className="template-thumb" style={{ flexDirection: 'column', gap: 2 }}>
      <div className="thumb-line" style={{ width: 36, height: 3 }} />
      {[32, 28, 30].map((w, i) => (
        <div key={i} className="thumb-line" style={{ width: w }} />
      ))}
    </div>
  );
  if (id === 'template3') return (
    <div className="template-thumb" style={{ flexDirection: 'column', gap: 2 }}>
      <div className="thumb-line" style={{ width: 36, height: 4, opacity: 0.9 }} />
      {[28, 32, 24].map((w, i) => (
        <div key={i} className="thumb-line" style={{ width: w }} />
      ))}
    </div>
  );
  if (id === 'template4') return (
    <div className="template-thumb" style={{ flexDirection: 'column', gap: 2, alignItems: 'center' }}>
      <div className="thumb-line" style={{ width: 16, height: 4 }} />
      <div className="thumb-line" style={{ width: 24, height: 2 }} />
      {[32, 28, 30].map((w, i) => (
        <div key={i} className="thumb-line" style={{ width: w }} />
      ))}
    </div>
  );
  if (id === 'template5') return (
    <div className="template-thumb">
      <div className="thumb-content" style={{ flex: 1, paddingRight: 2 }}>
        {[18, 14, 16].map((w, i) => (
          <div key={i} className="thumb-line" style={{ width: w }} />
        ))}
      </div>
      <div className="thumb-sidebar" style={{ width: 10, height: '100%', background: 'rgba(255,255,255,0.4)' }} />
    </div>
  );
  if (id === 'template6') return (
    <div className="template-thumb">
      <div className="thumb-sidebar" style={{ width: 10, background: 'rgba(255,255,255,0.4)' }} />
      <div className="thumb-content" style={{ flex: 1, paddingLeft: 4, borderLeft: '1px solid rgba(255,255,255,0.2)' }}>
        {[18, 14, 16, 12].map((w, i) => (
          <div key={i} className="thumb-line" style={{ width: w }} />
        ))}
      </div>
    </div>
  );
  return null;
}
