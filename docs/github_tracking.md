# GitHub Issues & Milestones Tracking

This document maps the project's engineering tasks to the remote repository's issues and milestones. All future commits targeting these tasks should reference their respective issue numbers in the commit message (e.g. `Closes #42` or `Refs #42`).

---

## 📅 Milestones

| Milestone ID | Title                                                    | Description                                                                                     | Due Date   |
| :----------- | :------------------------------------------------------- | :---------------------------------------------------------------------------------------------- | :--------- |
| **1**        | Non-Functional Requirements: Usability and Accessibility | Focuses on responsive UI, error layouts, keyboard navigation, and WCAG 2.1 AA compliance.       | 2026-07-22 |
| **2**        | Non-Functional Requirements: Monitoring and Reliability  | Covers backups, uptime status, database performance checks, and error logging tools.            | 2026-07-23 |
| **3**        | Non-Functional Requirements: Security and Privacy        | Integrates JWT path auth, PII scrubbing verification, encryption at rest, and noindex defaults. | 2026-07-22 |
| **4**        | Non-Functional Requirements: Performance and Scalability | Focuses on speed optimization, Vercel timeouts, polling intervals, and resource scaling.        | 2026-07-22 |

---

## 📋 Task to Issue Mapping

| Task # | Task Description                                                       | Task ID                                | GitHub Issue | Status | Target Milestone |
| :----: | :--------------------------------------------------------------------- | :------------------------------------- | :----------: | :----: | :--------------- |
| **1**  | Initialize GitHub repository and setup Next.js project with TypeScript | `5d060f8a-1332-4d02-81ac-aa1a7843f6a3` |   **#39**    |  Done  | -                |
| **2**  | Create Dockerfile and docker-compose for local development environment | `c1fc9859-ac6f-4b03-8773-f3eac23657bf` |   **#42**    |  Done  | -                |
| **3**  | Setup database migration tooling using Supabase CLI and SQL scripts    | `33e87663-96eb-4b00-b630-ba227c2362c3` |   **#48**    |  Done  | -                |
| **4**  | Configure GitHub Actions workflow for CI (lint, check, test)           | `dbb7eb4a-5fa3-4c3b-8570-4f186abb3152` |   **#45**    |  Done  | Milestone 2      |
| **5**  | Setup Jest and React Testing Library for unit & integration tests      | `dfe95477-2e31-4812-8cd7-33390f5caf68` |   **#43**    |  Done  | Milestone 1      |
| **6**  | Implement database indexes and constraints as per schema design        | `ce45654e-520b-41b9-8193-7a47d9638999` |   **#47**    |  Done  | -                |
| **7**  | Setup GitHub Actions deployment integration with Vercel                | `1c8b02f4-c351-4be3-83a6-b23ff0472467` |   **#46**    |  Done  | Milestone 2      |
| **8**  | Setup documentation framework with Docusaurus and initial docs         | `3e7a0212-1e55-454c-8edf-326927d16af5` |   **#49**    |  Done  | -                |
| **9**  | Setup ESLint, Prettier, and Husky for linting and formatting           | `8a740e79-bcbf-41e4-8bfd-12cecdaf6d82` |   **#40**    |  Done  | -                |
| **10** | Document API endpoints and data models in OpenAPI format               | `9ebcc52d-6484-466d-be73-45b898f8c2f2` |   **#50**    |  Done  | -                |
| **11** | Integrate Tailwind CSS with Next.js and configure basic styles         | `a89398a6-29fe-47a6-9525-22c220d40d7c` |   **#41**    |  Done  | -                |
| **12** | Integrate ESLint and Prettier with testing and Docker environment      | `24e2ecca-b26d-410e-b9e9-7a2c18f46049` |   **#44**    |  Done  | -                |
| **13** | Enable and Configure Vercel Blob Storage for Resume PDFs/Photos        | `d291a122-fe84-468e-8e4e-ac82efb2ef74` |   **#57**    |  Todo  | -                |
| **14** | Create GitHub Actions Workflow for Linting, Checking, and Testing      | `043cd481-2ca7-4dba-9668-3b19b1310912` |   **#59**    |  Done  | Milestone 2      |
| **15** | Create Dockerfile for Next.js 16.2.7 with TS and Tailwind              | `e5a8d7b7-fb9c-4ec6-93e4-6f268ff4c186` |   **#61**    |  Done  | -                |
| **16** | Provision Supabase Postgres 18.4 Instance and Configure Access         | `27df936b-5390-42c1-8e9e-44a5bbe5f3f6` |   **#97**    |  Todo  | -                |
| **17** | Create docker-compose.yml for Local Dev with Supabase/Blob Mocks       | `5ac7ea26-a221-4470-8d55-b2c5a71cc899` |   **#62**    |  Done  | -                |
| **18** | Configure Automatic Deployment to Vercel on Successful CI              | `c16422bc-13c7-4655-b739-5eebff434092` |   **#60**    |  Done  | Milestone 2      |
| **19** | Implement and Test File Upload/Retrieval via Vercel Blob SDK           | `8f628a4c-be0a-417a-8f03-33b787cbaaf6` |   **#58**    |  Todo  | -                |
| **20** | Apply Database Schema and Create Tables with Indexes/Constraints       | `35499962-e3c1-41a7-9e95-50b75be83ed2` |   **#98**    |  Done  | -                |
| **21** | Document Local Development Environment Setup and Usage                 | `6c88406e-3203-45cf-8768-3d2815acccfc` |   **#63**    |  Todo  | -                |
| **22** | Implement PDF Storage in Vercel Blob Storage in `/api/upload`          | `cc5548ef-fc8a-4b43-9807-f06925ca8733` |   **#51**    |  Todo  | -                |
| **23** | Create Portfolio and Parse Job Records Transactionally on Upload       | `9abd2648-da6d-4113-841f-a3752856fbba` |   **#100**   |  Todo  | -                |
| **24** | Implement Async PDF Parsing Pipeline (pdf-parse & LLM)                 | `d0afc24f-ad23-4f01-9a05-d9e9b047be26` |   **#101**   |  Todo  | Milestone 4      |
| **25** | Create Public Portfolio SSR Page at `/p/[slug]`                        | `c64c38cd-42ab-48f1-82e8-51f31b287361` |   **#54**    |  Todo  | -                |
| **26** | Create Status Polling API Endpoint `/api/status/:jobId`                | `3a7e46e3-8617-408b-909a-f70bde1cf61d` |   **#90**    |  Todo  | -                |
| **27** | Implement PII Stripping Logic in Async Parser                          | `41afddae-ec08-4e1f-8273-f1368b59ccb9` |   **#69**    |  Todo  | Milestone 3      |
| **28** | Implement Upload Rate Limiting Middleware for `/api/upload`            | `1c9217c7-d3b2-4dc2-bfa1-7b04a4412345` |   **#102**   |  Todo  | Milestone 3      |
| **29** | Implement Clear Parse Failure Handling and User Feedback               | `d84ca1bc-2cb4-4464-abdb-5580f96d97f9` |   **#53**    |  Todo  | Milestone 1      |
| **30** | Implement Landing Page UI for Resume PDF Upload                        | `88eba6e9-e3c6-4430-8ac4-c4d2b21fce5a` |   **#103**   |  Todo  | Milestone 1      |
| **31** | Implement Unique Slug Generation Logic for Portfolios                  | `aaa6159d-42f0-448a-8bee-ac72c3c10f91` |   **#99**    |  Todo  | -                |
| **32** | Implement PII Stripping and Verification in Public Portfolio API       | `b2a3ab8f-0701-45b6-94e5-de6483f154a8` |   **#93**    |  Todo  | Milestone 3      |
| **33** | Implement Server-Side Validation for Resume PDF Upload                 | `0dd097ba-3420-4938-9cc4-50a296b4fae6` |   **#89**    |  Todo  | -                |
| **34** | Implement Photo Upload Endpoint and Edit UI Integration                | `9e8818d1-3703-4fdd-a8b1-d8e3df18b136` |   **#55**    |  Todo  | -                |
| **35** | Implement Default Noindex SEO Headers/Meta on Public Portfolio         | `7b55cf5d-71f5-4ff1-84ba-7356e43fe7be` |   **#104**   |  Todo  | Milestone 3      |
| **36** | Implement Edit Page UI for Portfolio Content Updates                   | `dad78a07-95ac-4720-9983-4476c1613838` |   **#56**    |  Todo  | -                |
| **37** | Implement Visibility Toggle and Soft Delete API Endpoints              | `5ed93c17-65cc-4e94-8d13-04aa059db1d4` |   **#105**   |  Todo  | -                |
| **38** | Add SEO Indexing Toggle UI and API Integration in Edit Page            | `eb4bace6-ffce-4c78-8cb4-9ea14297db03` |   **#95**    |  Todo  | Milestone 3      |
| **39** | Generate and Store Signed JWT Edit Token on Portfolio Creation         | `7a98f8e2-de03-424f-a681-0c47123e26ad` |   **#94**    |  Todo  | Milestone 3      |
| **40** | Return 404 for Unpublished/Deleted Portfolios in API and SSR           | `a8976faa-c236-4fa9-adee-766f005f847d` |   **#106**   |  Todo  | Milestone 3      |
