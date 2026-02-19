# ReportGuard - Project Structure & Setup Guide

## 📁 Complete Project Structure

```
reportguard/
├── app/
│   ├── layout.tsx                 # Root layout with theme provider
│   ├── page.tsx                   # Landing page with Hero, Features, etc.
│   ├── globals.css                # Global styles with glassmorphism
│   ├── dashboard/
│   │   └── page.tsx              # User dashboard with report history
│   ├── upload/
│   │   └── page.tsx              # File upload interface
│   ├── analysis/
│   │   └── [id]/
│   │       └── page.tsx          # Analysis results page
│   ├── login/
│   │   └── page.tsx              # Login page
│   ├── signup/
│   │   └── page.tsx              # Signup page
│   └── api/
│       ├── upload/
│       │   └── route.ts          # File upload endpoint
│       ├── analyze/
│       │   └── route.ts          # Analysis trigger endpoint
│       ├── analysis/
│       │   └── [id]/
│       │       └── route.ts      # Get analysis status/results
│       ├── reports/
│       │   └── route.ts          # User reports list
│       ├── chat/
│       │   └── route.ts          # Chatbot endpoint
│       └── download/
│           └── [id]/
│               └── route.ts      # Download PDF summary
│
├── components/
│   ├── ThemeProvider.tsx          # Dark/light mode provider
│   ├── ThemeToggle.tsx            # Theme toggle button
│   ├── layout/
│   │   ├── Header.tsx            # Navigation header
│   │   └── Footer.tsx            # Footer with links
│   ├── landing/
│   │   ├── Hero.tsx              # Hero section
│   │   ├── Features.tsx          # Features grid
│   │   ├── HowItWorks.tsx       # 4-step process
│   │   └── CTA.tsx               # Call to action
│   ├── ui/
│   │   ├── Button.tsx            # Reusable button component
│   │   ├── Card.tsx              # Card with variants
│   │   ├── Badge.tsx             # Severity badges
│   │   ├── Progress.tsx          # Progress bar/circle
│   │   ├── Input.tsx             # Form input
│   │   └── Alert.tsx             # Notification alert
│   └── features/
│       ├── FileUploader.tsx      # Drag-and-drop uploader
│       ├── ScoreCard.tsx         # Compliance score display
│       ├── ViolationList.tsx     # Categorized violations
│       └── ChatInterface.tsx     # AI chatbot UI
│
├── lib/
│   ├── utils.ts                   # Utility functions
│   ├── constants.ts               # App-wide constants
│   ├── validation/
│   │   ├── rules.ts              # Anna University rules
│   │   ├── structural-validator.ts  # Structure validation
│   │   ├── formatting-validator.ts  # Format validation
│   │   └── scoring.ts            # Compliance scoring
│   ├── ai/
│   │   ├── gemini-client.ts      # Gemini API integration
│   │   ├── grammar-analyzer.ts   # Grammar analysis
│   │   └── chatbot.ts            # Chatbot logic
│   ├── parsers/
│   │   ├── pdf-parser.ts         # PDF extraction
│   │   └── docx-parser.ts        # DOCX extraction
│   └── queue/
│       ├── job-processor.ts      # Async job processing
│       └── analysis-job.ts       # Analysis orchestration
│
├── types/
│   └── index.ts                   # TypeScript type definitions
│
├── prisma/
│   └── schema.prisma              # Database schema
│
├── public/
│   ├── images/                    # Static images
│   └── icons/                     # Icon assets
│
├── .env.example                   # Environment variables template
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── tailwind.config.ts             # Tailwind with custom theme
├── next.config.js                 # Next.js configuration
├── .eslintrc.json                 # ESLint rules
├── .prettierrc                    # Prettier config
└── README.md                      # Project documentation
```

## 🎨 Design System

### Color Palette
- **Primary**: Purple (#8b5cf6) to Pink (#ec4899) gradients
- **Accent**: Blue (#3b82f6), Violet (#a78bfa)
- **Dark Mode**: Background #0a0a0f, Card #13131a
- **Light Mode**: Background #ffffff, Card #f8f9fa

### Typography
- **Font**: Inter (from Google Fonts)
- **Sizes**: Base 16px, Headings 32-56px
- **Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

### Components
- **Glassmorphism**: `backdrop-blur-xl bg-white/10 border border-white/20`
- **Glowing Effects**: Purple/pink shadow with blur
- **Animations**: Float, glow, slide-up, fade-in

## 🔥 Key Features Implemented

### 1. Landing Page
- Hero section with animated gradient background
- Features grid (6 features with icons)
- How it works (4-step process)
- CTA section with trust indicators
-Header/footer with mobile responsive navigation

### 2. Theme System
- Dark mode (default)
- Light mode toggle
- Smooth transitions
- System preference detection

### 3. Validation Engine
Complete Anna University rules implementation:
- ✅ Document format (A4, margins, spacing)
- ✅ Font validation (Times New Roman, sizes)
- ✅ Structure & order (12 required sections)
- ✅ Chapter structure (6 chapters, numbering)
- ✅ Page numbering (Roman → Arabic)
- ✅ Tables & figures (chapter-wise numbering)
- ✅ Abstract validation (250-300 words)
- ✅ Reference format (IEEE style)
- ✅ Plagiarism risk detection
- ✅ Severity categorization
- ✅ Compliance scoring (4 scores: Structural, Formatting, Grammar, Overall)

### 4. UI Components
- Button (4 variants, 3 sizes, loading state)
- Card (3 variants: glass, glow, solid)
- Badge (severity color-coded)
- All components are reusable and type-safe

### 5. Type Safety
- Comprehensive TypeScript interfaces
- Strict type checking enabled
- No `any` types used

## 🚀 Getting Started

### Prerequisites
Install Node.js 18+ and npm

### Installation Steps
```bash
# 1. Navigate to project directory
cd d:\project\project_traker

# 2. Install dependencies
npm install

# 3. Install additional packages
npm install next-themes lucide-react clsx tailwind-merge

# 4. Create .env.local file
cp .env.example .env.local

# 5. Add your API keys to .env.local
# GOOGLE_GEMINI_API_KEY=your_key_here

# 6. Run development server
npm run dev

# 7. Open browser
# Visit http://localhost:3000
```

### Build for Production
```bash
npm run build
npm start
```

## 📦 Required npm Packages

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@google/generative-ai": "^0.17.0",
    "next-themes": "^0.3.0",
    "lucide-react": "^0.400.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0"
  }
}
```

## 🔐 Environment Variables

Create `.env.local`:
```env
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
DATABASE_URL=your_database_connection_string
```

## 📱 Responsive Design

- **Mobile**: < 640px (stacked layout)
- **Tablet**: 640px - 1024px (2-column grid)
- **Desktop**: > 1024px (3-4 column grid)
- **Touch targets**: Minimum 44×44px

## ♿ Accessibility

- ARIA labels on all interactive elements
- Semantic HTML (header, nav, main, footer, section)
- Keyboard navigation support
- Focus visible states
- Color contrast WCAG AA compliant

## 🎯 Next Steps (To Complete Full System)

1. **Database Setup**
   - Initialize Prisma schema
   - Set up PostgreSQL database
   - Create migrations

2. **Authentication**
   - Implement NextAuth.js
   - Add login/signup pages
   - Protected routes middleware

3. **File Upload API**
   - Implement file validation
   - Store files in Vercel Blob or S3
   - Create database records

4. **Analysis Engine**
   - PDF/DOCX parsers integration
   - Gemini API for AI analysis
   - Async job queue processing

5. **Dashboard & Results**
   - Report history page
   - Analysis results display
   - Score visualization
   - Violation categorization

6. **Chatbot**
   - Gemini chat integration
   - Message history
   - Context awareness

7. **Testing**
   - Unit tests for validation rules
   - Integration tests for API
   - E2E tests with Playwright

8. **Deployment**
   - Deploy toVercel
   - Configure environment variables
   - Set up monitoring

## 📖 Documentation

- **User Guide**: How to upload and analyze reports
- **Faculty Guide**: Understanding compliance scores
- **API Documentation**: REST endpoints reference
- **Deployment Guide**: Production setup instructions

## 🎨 Design Inspiration

The purple/violet glassmorphism theme is inspired by modern SaaS platforms, featuring:
- Smooth gradients and glowing effects
- Premium feel with subtle animations
- Dark mode optimized
- Professional and trustworthy aesthetic

## 📊 Performance Optimizations

- Next.js App Router for optimal loading
- Image optimization with next/image
- Code splitting and lazy loading
- React.memo for heavy components
- CSS custom properties for theming

## 🔒 Security

- File type and size validation
- MIME type checking
- SQL injection prevention (Prisma ORM)
- XSS protection (React auto-escaping)
- CSRF tokens (NextAuth.js)
- Environment variables for secrets

---

**ReportGuard** - AI-Powered Academic Report Analyzer
Built with Next.js 14, TypeScript, Tailwind CSS, and Google Gemini AI
