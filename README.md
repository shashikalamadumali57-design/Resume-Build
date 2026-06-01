# 📄 Resume Build

A modern, feature-rich **CV/Resume Builder** built with React and Vite. Create stunning, professional resumes with real-time preview, multiple templates, and full customization — all in the browser.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

### 🎨 6 Professional Templates
Choose from six beautifully designed resume templates, each with a unique layout and style:
- **Template 1** — Classic Professional
- **Template 2** — Modern Sidebar
- **Template 3** — Creative Split
- **Template 4** — Elegant Minimal
- **Template 5** — Bold & Dynamic
- **Template 6** — Clean Corporate

### 📝 Comprehensive Editor
- **Personal Info** — Name, job title, email, phone, address, website, LinkedIn
- **Profile Photo** — Upload with adjustable positioning and zoom
- **Professional Summary** — Rich text description
- **Work Experience** — Company, position, dates, location, bullet-point descriptions
- **Education** — Institution, degree, field of study, GPA
- **Skills** — Visual percentage bars/circles
- **Languages** — Proficiency levels with visual indicators
- **Certifications** — Name, issuer, and date
- **Custom Sections** — Add unlimited custom sections with bullet points

### 🎯 Theme Customization
- **Primary Color** — Accent color for headings, icons, and highlights
- **Secondary Color** — Sidebar and section backgrounds
- **Background Color** — Overall page background
- **Text Color** — Main body text

### ⚡ Real-Time Preview
See your changes instantly as you type — no need to save or refresh.

### 📥 PDF Export
Download your finished resume as a high-quality PDF with one click.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/shashikalamadumali57-design/Resume-Build.git

# Navigate to the project
cd Resume-Build/frontend/resume_build

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at **http://localhost:5173**

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
Resume-Build/
└── frontend/
    └── resume_build/
        ├── public/              # Static assets (favicon, icons)
        ├── src/
        │   ├── assets/          # Images and SVGs
        │   ├── components/
        │   │   ├── layouts/
        │   │   │   ├── EditorPanel.jsx    # Left-side editor with all sections
        │   │   │   └── Toolbar.jsx        # Top toolbar (template selector, PDF export)
        │   │   ├── ResumeSections/
        │   │   │   ├── PersonalInfoSection.jsx
        │   │   │   ├── ExperienceSection.jsx
        │   │   │   ├── EducationSection.jsx
        │   │   │   ├── SkillsSection.jsx
        │   │   │   ├── LanguagesSection.jsx
        │   │   │   ├── CertificationsSection.jsx
        │   │   │   ├── CustomSectionsSection.jsx
        │   │   │   └── ThemeSettingsSection.jsx
        │   │   └── ResumeTemplates/
        │   │       ├── Template1.jsx      # Classic Professional
        │   │       ├── Template2.jsx      # Modern Sidebar
        │   │       ├── Template3.jsx      # Creative Split
        │   │       ├── Template4.jsx      # Elegant Minimal
        │   │       ├── Template5.jsx      # Bold & Dynamic
        │   │       └── Template6.jsx      # Clean Corporate
        │   ├── context/
        │   │   └── CVContext.jsx  # Global state management
        │   ├── App.jsx           # Main application component
        │   ├── App.css           # App-specific styles
        │   ├── index.css         # Global styles & design system
        │   └── main.jsx          # Entry point
        ├── index.html
        ├── vite.config.js
        └── package.json
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI component library |
| **Vite 8** | Build tool & dev server |
| **Lucide React** | Beautiful icon set |
| **html2pdf.js** | PDF generation |
| **CSS3** | Custom styling with CSS variables |

---

## 📸 How to Use

1. **Choose a Template** — Select from 6 templates in the toolbar
2. **Fill in Your Details** — Use the editor panel on the left
3. **Customize Colors** — Adjust theme settings to match your style
4. **Upload a Photo** — Add a professional headshot
5. **Add Sections** — Include experience, education, skills, and more
6. **Download PDF** — Export your finished resume with one click

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Made with ❤️ by [shashikalamadumali57-design](https://github.com/shashikalamadumali57-design)**