# Vinaykumar V A - Portfolio

A modern, interactive portfolio website showcasing my work as a Backend Engineer specializing in Golang, Kubernetes, and cloud-native technologies.

🌐 **Live Site:** [vinaycharlie01.github.io](https://vinaycharlie01.github.io)

## 🚀 Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **GSAP** - Advanced animations
- **Custom NDOT Font** - Unique dot-matrix style typography

### Backend (Development Server)
- **Go 1.23** - Backend API server
- **Mage** - Build automation tool

### Development Tools
- **Devbox** - Reproducible development environment
- **Vitest** - Unit testing framework
- **PostCSS** - CSS processing
- **TypeScript** - Type-safe JavaScript

## 📁 Project Structure

```
vinayprotfolio/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components (6 components)
│   │   │   ├── About.tsx
│   │   │   ├── WorkExperience.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── FindMe.tsx
│   │   │   ├── WorldMap.tsx
│   │   │   └── GitHubActivity.tsx
│   │   ├── styles/          # CSS modules (8 files)
│   │   │   ├── index.css
│   │   │   ├── App.css
│   │   │   └── [component].css
│   │   ├── images/          # Image assets
│   │   ├── App.tsx          # Main app component
│   │   └── index.tsx        # Entry point
│   ├── public/              # Static assets
│   │   ├── NDOT-Regular.otf # Custom font
│   │   └── images/
│   ├── build/               # Production build output
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── postcss.config.cjs
├── vinaycharlie01.github.io/ # GitHub Pages deployment
├── main.go                  # Go backend server
├── rundev.yaml             # Mage build configuration
├── devbox.json             # Development environment config
└── README.md

```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ and npm
- Go 1.23+
- Devbox (optional, for reproducible environment)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/vinaycharlie01/vinayprotfolio.git
   cd vinayprotfolio
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Start development server**
   ```bash
   # Using Mage (recommended)
   mage frontend:run

   # Or directly with npm
   cd frontend
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:5173`

## 📦 Build & Deployment

### Build Frontend
```bash
# Using Mage
mage frontend:build

# Or directly with npm
cd frontend
npm run build
```

Build output will be in `frontend/build/`

### Deploy to GitHub Pages
```bash
# Copy build files to GitHub Pages repo
cp -r frontend/build/* vinaycharlie01.github.io/

# Commit and push
cd vinaycharlie01.github.io
git add -A
git commit -m "Deploy: Update portfolio"
git push origin main
```

## 🧪 Testing

```bash
cd frontend
npm test
```

## 🎨 Features

- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Interactive Animations** - Smooth transitions and hover effects using GSAP and Framer Motion
- **Custom Typography** - Unique NDOT dot-matrix font for headers
- **GitHub Activity** - Live contribution graph visualization
- **Timeline Design** - Clean, organized presentation of work experience and projects
- **Dark Theme** - Modern dark color scheme with purple accents
- **Performance Optimized** - Fast loading with Vite and code splitting

## 🔧 Development Commands

### Frontend
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm test            # Run tests
npm audit           # Check for vulnerabilities
```

### Using Mage
```bash
mage frontend:setup  # Install dependencies
mage frontend:run    # Start dev server
mage frontend:build  # Build for production
```

## 📊 Project Stats

- **0 Security Vulnerabilities** ✅
- **218 npm packages** (optimized from 240)
- **6 React Components**
- **8 CSS Modules**
- **TypeScript** for type safety

## 🎯 Sections

1. **About** - Introduction and background
2. **Work Experience** - Professional experience at IBM/Instana and MSYS Technology
3. **Projects** - Key projects including Kubernetes operators, CLI tools, and microservices
4. **Find Me** - Contact information and social links
5. **World Map** - Geographic presence visualization

## 🔐 Security

- All dependencies regularly updated
- No known security vulnerabilities
- Secure build process with TypeScript type checking

## 📝 License

This project is personal portfolio code. Feel free to use it as inspiration for your own portfolio, but please don't copy it directly.

## 👤 Author

**Vinaykumar V A**
- GitHub: [@vinaycharlie01](https://github.com/vinaycharlie01)
- LinkedIn: [vinaycharlie01](https://linkedin.com/in/vinaycharlie01)
- Email: vinikshatriyas@gmail.com
- Phone: +91 9380862951

## 🙏 Acknowledgments

- Custom NDOT font for unique typography
- React and Vite communities for excellent tools
- Framer Motion and GSAP for animation capabilities

---

**Built with ❤️ using React, TypeScript, and Go**