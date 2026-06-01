import { createContext, useContext, useState, useCallback } from 'react';

const CVContext = createContext(null);

export const initialCV = {
  personal: {
    firstName: 'John',
    lastName: 'Doe',
    jobTitle: 'Full Stack Developer',
    email: 'john.doe@email.com',
    phone: '+1 (555) 000-0000',
    address: 'New York, NY, USA',
    website: 'johndoe.dev',
    linkedin: 'linkedin.com/in/johndoe',
    photo: null,
    photoSettings: { x: 50, y: 50, zoom: 1 },
    summary:
      'Passionate and innovative full-stack developer with 5+ years of experience building scalable, high-performance web applications. Proven track record of delivering complex projects on time and exceeding client expectations.',
  },
  experience: [
    {
      id: '1',
      company: 'Tech Corp Inc.',
      position: 'Senior Full Stack Developer',
      startDate: '2021-01',
      endDate: '',
      current: true,
      location: 'New York, NY',
      description:
        '• Led development of microservices architecture serving 1M+ users\n• Reduced API response time by 40% through performance optimization\n• Mentored a team of 5 junior developers',
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Frontend Developer',
      startDate: '2019-06',
      endDate: '2020-12',
      current: false,
      location: 'San Francisco, CA',
      description:
        '• Built React-based dashboard used by 50K+ customers\n• Implemented real-time data visualization features',
    },
  ],
  education: [
    {
      id: '1',
      institution: 'Massachusetts Institute of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2015-09',
      endDate: '2019-05',
      gpa: '3.8',
    },
  ],
  skills: [
    { id: '1', name: 'React / Next.js', percentage: 92 },
    { id: '2', name: 'Node.js / Express', percentage: 85 },
    { id: '3', name: 'TypeScript', percentage: 88 },
    { id: '4', name: 'Python / Django', percentage: 75 },
    { id: '5', name: 'PostgreSQL', percentage: 80 },
  ],
  languages: [
    { id: '1', name: 'English', percentage: 100, level: 'Native' },
    { id: '2', name: 'Spanish', percentage: 65, level: 'Intermediate' },
    { id: '3', name: 'French', percentage: 40, level: 'Basic' },
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Solutions Architect Associate',
      issuer: 'Amazon Web Services',
      date: '2023-05',
    },
    {
      id: '2',
      name: 'Google Cloud Professional',
      issuer: 'Google',
      date: '2022-11',
    },
  ],
  theme: {
    primaryColor: '#6c63ff',
    secondaryColor: '#22252a',
    backgroundColor: '#ffffff',
    textColor: '#333333',
  },
  customSections: [],
  selectedTemplate: 'template1',
};

export function CVProvider({ children }) {
  const [cvData, setCVData] = useState(initialCV);

  const updatePersonal = useCallback((field, value) => {
    setCVData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
  }, []);

  const updateTheme = useCallback((field, value) => {
    setCVData((prev) => ({
      ...prev,
      theme: { ...prev.theme, [field]: value },
    }));
  }, []);

  const updatePhotoSettings = useCallback((field, value) => {
    setCVData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        photoSettings: { ...prev.personal.photoSettings, [field]: value }
      }
    }));
  }, []);

  const setTemplate = useCallback((template) => {
    setCVData((prev) => ({ ...prev, selectedTemplate: template }));
  }, []);

  const addItem = useCallback((section, item) => {
    setCVData((prev) => ({
      ...prev,
      [section]: [...prev[section], { ...item, id: Date.now().toString() }],
    }));
  }, []);

  const updateItem = useCallback((section, id, updates) => {
    setCVData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  }, []);

  const deleteItem = useCallback((section, id) => {
    setCVData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }));
  }, []);

  // ── Custom Sections ──
  const addCustomSection = useCallback((title) => {
    setCVData((prev) => ({
      ...prev,
      customSections: [...prev.customSections, { id: Date.now().toString(), title, points: [] }],
    }));
  }, []);

  const updateCustomSection = useCallback((sectionId, updates) => {
    setCVData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((s) => s.id === sectionId ? { ...s, ...updates } : s),
    }));
  }, []);

  const deleteCustomSection = useCallback((sectionId) => {
    setCVData((prev) => ({
      ...prev,
      customSections: prev.customSections.filter((s) => s.id !== sectionId),
    }));
  }, []);

  const addPoint = useCallback((sectionId, text) => {
    setCVData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((s) =>
        s.id === sectionId
          ? { ...s, points: [...s.points, { id: Date.now().toString(), text }] }
          : s
      ),
    }));
  }, []);

  const updatePoint = useCallback((sectionId, pointId, text) => {
    setCVData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((s) =>
        s.id === sectionId
          ? { ...s, points: s.points.map((p) => p.id === pointId ? { ...p, text } : p) }
          : s
      ),
    }));
  }, []);

  const deletePoint = useCallback((sectionId, pointId) => {
    setCVData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((s) =>
        s.id === sectionId
          ? { ...s, points: s.points.filter((p) => p.id !== pointId) }
          : s
      ),
    }));
  }, []);

  return (
    <CVContext.Provider
      value={{
        cvData,
        updatePersonal,
        updateTheme,
        updatePhotoSettings,
        setTemplate,
        addItem,
        updateItem,
        deleteItem,
        addCustomSection,
        updateCustomSection,
        deleteCustomSection,
        addPoint,
        updatePoint,
        deletePoint,
      }}
    >
      {children}
    </CVContext.Provider>
  );
}

export const useCV = () => {
  const ctx = useContext(CVContext);
  if (!ctx) throw new Error('useCV must be used within CVProvider');
  return ctx;
};


