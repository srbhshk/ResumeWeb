# Project Overview

Welcome to the official developer documentation for **ResumeWeb**!

ResumeWeb is a premium web application that allows users to upload their resume in PDF format, automatically parse and strip personal identifiable information (PII) using advanced async pipelines, and instantly publish a beautiful, SEO-optimized, and responsive web-based portfolio.

---

## High-Level Architecture

ResumeWeb is built as a modern, decoupled web application consisting of:
1. **Frontend / API Layer:** Scaffolder built using **Next.js 16.2.7 (TypeScript, Tailwind CSS, App Router)**.
2. **Database Layer:** Fully managed relational database using **Supabase (PostgreSQL 18.4)**.
3. **Storage Layer:** High-performance binary object storage utilizing **Vercel Blob Storage** for managing original resume PDFs and portfolio headshot photos.
4. **Local Development Stack:** Dockerized PostgreSQL service paired with storage and Supabase local configuration mocks.

---

## Core Features

- **Resume Upload & Validation:** Clients upload resume PDFs via a rate-limited endpoint with strict file type and size constraints.
- **Async Parsing Pipeline:** Extracted text is processed via LLM integration to generate a structured JSON profile containing work experience, skills, projects, and education.
- **Automatic PII Stripping:** Prior to rendering public pages, contact information (email, phone, address) is redacted to protect user privacy.
- **Dynamic Portfolios:** Server-side rendered (SSR) web portfolios at `/p/[slug]` optimized for mobile viewing (WCAG 2.1 AA compliant) and search engine crawling toggles (`noindex`/`index`).
- **User Control Dashboard:** Edit access secured via cryptographically signed JWT tokens, allowing content modifications, visibility toggling, photo uploads, and portfolio deletion.
