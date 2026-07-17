# ResumeWeb — Instant Privacy-First Digital Portfolios

**ResumeWeb** is a privacy-centric, account-less SaaS web application that converts a resume PDF into a polished, mobile-friendly online portfolio in under a minute.

Traditional methods of sharing resumes expose private contact details and force users through complex site-building signups. ResumeWeb addresses these friction points by implementing **zero-signup onboarding**, **automatic PII stripping** at parse time, and **private magic edit links** secured by signed tokens.

---

## 🌟 Key Features

- **No-Signup Upload:** Upload a single resume PDF (max 4MB) and launch a live portfolio page instantly. No account, email, or password required.
- **AI-Powered Structured Parsing:** Automatically parses work experiences, skills, education, and project lists using a custom LLM extraction pipeline.
- **Privacy-by-Default:** Dynamically strips sensitive PII (emails, phone numbers, home/mailing addresses) from the public portfolio page.
- **Magic Edit Token Auth:** Secure URL path editing (`/edit/[token]`) powered by signed, time-unlimited `HS256` JWTs.
- **SEO & Indexing Controls:** Public portfolios default to `noindex` (with custom meta tags and `X-Robots-Tag` headers) to prevent search engine caching. Users can opt-in to SEO indexing via a toggle.
- **Custom Profile Photo:** Upload a profile picture (JPEG/PNG, max 2MB) stored securely in Vercel Blob Storage to personalize the portfolio page.
- **Soft Delete:** Delete portfolios instantly via the edit interface.

---

## 🛠️ Technology Stack

| Layer              | Component                   | Description                                                                                    |
| ------------------ | --------------------------- | ---------------------------------------------------------------------------------------------- |
| **Frontend**       | Next.js 16.2.7 (App Router) | React server-side rendering (SSR) for fast loads and dynamic header SEO metadata.              |
| **Styling**        | Tailwind CSS                | Sleek, modern typography, glassmorphism UI components, and fully responsive layouts.           |
| **Database**       | Supabase Postgres 18.4      | Structured relational database storing portfolio fields, async jobs, and hashed upload limits. |
| **Storage**        | Vercel Blob Storage         | Secure, edge-optimised blob store hosting resume PDFs and profile pictures.                    |
| **PDF Extraction** | `pdf-parse` & LLM Wrapper   | Node.js native text parser paired with serverless LLM calls for structured JSON outputs.       |

---

## 📂 Project Structure

All architectural and product documentation is located in the [docs/](file:///Users/ui2go/Desktop/ResumeWeb/docs) folder. The codebase follows the Next.js App Router convention:

```
ResumeWeb/
├── docs/                      # Original design and requirements documents
│   ├── release-brief-...md    # Product Requirements Document (PRD)
│   ├── architecture-...md     # Enterprise Architecture Specification
│   ├── release-features-...md # Core Feature Strategy
│   ├── stories-...md          # Epic and User Story Definitions
│   └── tasks-...md            # Sequenced Engineering Task Roadmap
├── src/
│   ├── app/                   # Next.js App Router (pages and API endpoints)
│   │   ├── api/               # Serverless API routes (upload, status, edit, portfolio)
│   │   ├── edit/[token]/      # Client Private Edit Interface
│   │   ├── p/[slug]/          # Client Public Portfolio SSR Page
│   │   ├── status/[jobId]/    # Asynchronous polling processing screen
│   │   └── page.tsx           # Home Landing Page containing the PDF Dropzone
│   ├── components/            # Reusable React components (SEO Controls, Forms, Skeletons)
│   └── lib/                   # Helper libraries (Supabase SDK, Auth, PDF Parser)
├── Dockerfile                 # Multi-stage production container build
├── docker-compose.yml         # Dev environment container orchestrating mocks
└── tsconfig.json              # TypeScript compilation rules
```

---

## 🚀 How to Run Locally

### Prerequisites

- Node.js >= 16.14.0
- npm (bundled with Node)
- Docker & Docker Compose (optional for local database container)

### 1. Environment Configuration

Create a `.env.local` file in the project root:

```properties
# Supabase Database Credentials
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-supabase-service-key

# Vercel Blob Storage Credentials
VERCEL_BLOB_TOKEN=your-vercel-blob-token

# Security Settings
JWT_SECRET=your-strong-random-jwt-signing-secret
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production

Verify compilation and Turbopack static optimizations:

```bash
npm run build
```

---

## 🧪 Verification & Testing

### Automated Tests

Run Jest and React Testing Library suites:

```bash
npm run test
```

- **Unit testing:** Validates text sanitization patterns, PII scrubbing regex, rate limits, and JWT generation logic.
- **Integration testing:** Exercises API routes using mocked Supabase and Vercel Blob SDK interfaces.

### Manual Verification Flows

1. **Upload Validation:** Drop a non-PDF file or one larger than 4MB, and check for correct error validation feedback.
2. **Rate Limit Testing:** Perform 6 uploads within an hour from a single IP to trigger the `429 Too Many Requests` API route boundary.
3. **SEO Header Verification:** Access a public portfolio page with indexing disabled and verify that the `X-Robots-Tag: noindex` header is present.
