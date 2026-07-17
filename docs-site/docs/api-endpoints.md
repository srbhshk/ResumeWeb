# API Endpoints

This document describes the public and private API endpoints available in the ResumeWeb application.

---

## 1. Resume Upload Endpoint

### `POST /api/upload`

Uploads a resume PDF, allocates database records, and enqueues an asynchronous parsing job.

- **Request Headers:**
  - `Content-Type: multipart/form-data`
- **Request Body (Form Data):**
  - `file`: PDF file blob (Max size: 5MB, MIME: `application/pdf`).
- **Response:**
  - `202 Accepted`
    ```json
    {
      "success": true,
      "message": "Resume uploaded successfully, parsing started.",
      "jobId": "uuid-here",
      "portfolioId": "uuid-here",
      "editToken": "jwt-token-string"
    }
    ```
  - `400 Bad Request` (Invalid file type/size).
  - `429 Too Many Requests` (Rate limit exceeded, max 3 uploads per hour).

---

## 2. Parse Job Status Endpoint

### `GET /api/status/:jobId`

Queries the parsing status of a previously uploaded resume.

- **Response:**
  - `200 OK` (Processing complete)
    ```json
    {
      "success": true,
      "status": "success",
      "slug": "john-doe-resume"
    }
    ```
  - `200 OK` (Still parsing)
    ```json
    {
      "success": true,
      "status": "processing"
    }
    ```
  - `200 OK` (Failed parsing)
    ```json
    {
      "success": true,
      "status": "error",
      "message": "Detailed error information here"
    }
    ```
  - `404 Not Found` (Job not found).

---

## 3. Public SSR Portfolio Page

### `GET /p/:slug`

Renders the user's public web-based portfolio.

- **Security Note:** All PII (emails, phone numbers, home addresses) is automatically stripped/redacted server-side prior to rendering.
- **SEO Note:** If `allow_search_indexing` is false, returns `X-Robots-Tag: noindex` headers and renders meta tags.
- **Response:**
  - `200 OK` (Server-rendered HTML page).
  - `404 Not Found` (Portfolio doesn't exist, is unpublished, or soft-deleted).

---

## 4. Private Content Modifications (Edit Page)

### `PATCH /api/edit/:token`

Updates portfolio content.

- **Request Headers:**
  - `Authorization: Bearer <jwt-token>`
- **Request Body:**
  - Portfolio fields to modify (JSON content).
- **Response:**
  - `200 OK` (Updated portfolio details).
  - `401 Unauthorized` / `403 Forbidden` (Invalid/expired token).

---

## 5. Photo Upload Endpoint

### `POST /api/edit/:token/photo`

Uploads an headshot photo to Vercel Blob and attaches it to the portfolio.

- **Request Headers:**
  - `Authorization: Bearer <jwt-token>`
  - `Content-Type: multipart/form-data`
- **Request Body:**
  - `file`: Image file (PNG, JPG, max 2MB).
- **Response:**
  - `200 OK`
    ```json
    {
      "success": true,
      "photoUrl": "https://blob-storage-link/photo.png"
    }
    ```

---

## 6. Portfolio Soft Deletion

### `DELETE /api/edit/:token`

Marks a portfolio record as soft-deleted (`deleted_at` timestamp populated).

- **Request Headers:**
  - `Authorization: Bearer <jwt-token>`
- **Response:**
  - `200 OK` (Successfully deleted status).
