# ReportGuard

![ReportGuard](https://img.shields.io/badge/ReportGuard-v1.0.0-purple)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)

**AI-Powered Academic Project Report Analyzer for Anna University Standards**

ReportGuard is a production-ready SaaS platform that automatically validates and analyzes student project reports against official Anna University formatting guidelines using advanced AI technology.

## ✨ Features

### 🎯 Core Functionality

- **Structural Validation** - Verify 12 required sections in exact order
- **Formatting Compliance** - Check margins, fonts, spacing, and layout
- **AI Grammar Analysis** - Advanced language quality scoring with Gemini AI
- **Chapter Structure** - Validate 6 required chapters with proper numbering
- **Page Numbering** - Roman (i, ii, iii) → Arabic (1, 2, 3) validation
- **Tables & Figures** - Chapter-wise numbering and caption position
- **Abstract Validation** - 250-300 words with 4 required components
- **IEEE References** - Format and citation matching validation
- **Plagiarism Detection** - Heuristic pattern-based risk analysis
- **Compliance Scoring** - 4 detailed scores (Structural, Formatting, Grammar, Overall)

### 🎨 User Experience

- **Modern Design** - Purple/violet glassmorphism theme
- **Dark/Light Mode** - Seamless theme switching
- **Real-Time Progress** - Live analysis status tracking
- **Interactive Chatbot** - AI-powered report clarification
- **Mobile Responsive** - Works on all devices
- **Accessible** - WCAG AA compliant

### 🚀 Technical Features

- **Async Processing** - Non-blocking analysis with progress tracking
- **Type-Safe** - Full TypeScript implementation
- **Scalable** - Production-ready architecture
- **Secure** - File validation, MIME type checking
- **Fast** - Optimized with Next.js 14 App Router

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **AI**: Google Gemini API
- **Theme**: next-themes
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- Google Gemini API key

### Quick Start

```bash
# Clone the repository (or navigate to project directory)
cd d:\project\project_traker

# Install dependencies
npm install

# Install additional packages
npm install next-themes lucide-react clsx tailwind-merge

# Create environment file
cp .env.example .env.local

# Add your API key to .env.local
# GOOGLE_GEMINI_API_KEY=your_key_here

# Run development server
npm run dev

# Open http://localhost:3000
```

## 🎨 Design System

### Color Palette

```css
Primary: #8b5cf6 (Purple)
Secondary: #ec4899 (Pink)
Accent: #3b82f6 (Blue)

Dark Mode: #0a0a0f (Background)
Light Mode: #ffffff (Background)
```

### Glassmorphism Effects

- **Glass Cards**: `backdrop-blur-xl bg-white/10`
- **Glow Effects**: Purple/pink shadow blur
- **Smooth Animations**: Float, glow, slide-up
- **Gradient Backgrounds**: Purple to pink gradients

## 📂 Project Structure

```
app/                    # Next.js pages and API routes
├── layout.tsx         # Root layout with theme
├── page.tsx           # Landing page
├── globals.css        # Global styles
├── dashboard/         # Dashboard page
├── upload/            # Upload interface
├── analysis/[id]/     # Analysis results
└── api/               # API endpoints

components/            # React components
├── ui/                # Reusable UI components
├── layout/            # Header, Footer
├── landing/           # Landing page sections
└── features/          # Feature-specific components

lib/                   # Business logic
├── validation/        # Anna University rules
├── ai/                # Gemini AI integration
├── parsers/           # PDF/DOCX parsers
└── queue/             # Async processing

types/                 # TypeScript definitions
```

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for complete details.

## 🔐 Environment Variables

Create `.env.local`:

```env
# Google Gemini API
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here

# NextAuth (if using authentication)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32

# Database (if using Prisma)
DATABASE_URL=postgresql://user:password@localhost:5432/reportguard

# File Upload
MAX_FILE_SIZE_MB=10
ALLOWED_FILE_TYPES=application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document
```

## 🎯 Anna University Validation Rules

ReportGuard enforces strict compliance with:

1. **Document Format**: A4, margins (L:30/R:20/T:25/B:25mm), 1.5 spacing
2. **Font**: Times New Roman (12pt body, 14pt headings, 16pt titles)
3. **Structure**: 12 required sections in exact order
4. **Chapters**: 6 chapters with proper numbering (1.1.1)
5. **Page Numbering**: Roman → Arabic pattern
6. **Tables/Figures**: Chapter-wise numbering, correct captions
7. **Abstract**: 250-300 words, 4 components
8. **References**: IEEE style with matching citations
9. **Plagiarism**: Pattern-based risk detection
10. **Scoring**: Weighted compliance calculation

## 📊 Compliance Scoring

- **Structural**: 40% weight
- **Formatting**: 30% weight
- **Grammar**: 30% weight
- **Overall**: Weighted average (0-100)
- **Grades**: A+, A, B+, B, C+, C, F

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Production Build

```bash
npm run build
npm start
```

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Format code
npx prettier --write .
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Touch Targets**: Minimum 44×44px

## ♿ Accessibility

- ✅ ARIA labels on interactive elements
- ✅ Semantic HTML structure
- ✅ Keyboard navigation support
- ✅ Focus visible states
- ✅ Color contrast WCAG AA

## 📖 Documentation

- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Complete project architecture
- [.env.example](./.env.example) - Environment variables template

## 🤝 Contributing

This is a production SaaS application. For feature requests or bug reports, please open an issue.

## 📄 License

MIT License - See LICENSE file for details

## 🎓 Target Users

- Final-year engineering students
- Academic institutions
- Project supervisors
- Faculty members

## 📞 Support

For support, email support@reportguard.com or join our Discord community.

---

**Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Google Gemini AI**

**© 2024 ReportGuard. All rights reserved.**
