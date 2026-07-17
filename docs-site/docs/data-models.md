# Data Models

ResumeWeb utilizes PostgreSQL 18.4 (via Supabase) for managing data models. The relational database schema is structured as follows:

---

## 1. Portfolios (`portfolios`)

Represents the core portfolio records published by users.

| Column Name | Data Type | Constraints | Default Value | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY` | `gen_random_uuid()` | Unique portfolio identifier. |
| `slug` | `VARCHAR(32)` | `UNIQUE`, `NOT NULL` | - | URL slug identifying the public page. |
| `edit_token_jwt` | `TEXT` | `UNIQUE`, `NOT NULL` | - | Cryptographically signed token for access control. |
| `pdf_blob_url` | `TEXT` | `NOT NULL` | - | Storage link pointing to original resume. |
| `photo_blob_url` | `TEXT` | - | - | Optional link to headshot image. |
| `parse_status` | `parse_status_enum` | `NOT NULL` | `'pending'` | Current state: `'pending'`, `'processing'`, `'success'`, `'error'`. |
| `parse_error_message` | `TEXT` | - | - | Detailed error report if parsing fails. |
| `summary` | `TEXT` | - | - | Short resume overview. |
| `experience_json` | `JSONB` | - | `'[]'` | Structured array of work history. |
| `skills_json` | `JSONB` | - | `'[]'` | Structured array of technical skills. |
| `education_json` | `JSONB` | - | `'[]'` | Structured array of academic history. |
| `projects_json` | `JSONB` | - | `'[]'` | Structured array of personal projects. |
| `is_published` | `BOOLEAN` | `NOT NULL` | `FALSE` | Toggle to display the portfolio publicly. |
| `allow_search_indexing`| `BOOLEAN` | `NOT NULL` | `FALSE` | Toggle to allow Google SEO web indexing. |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL` | `NOW()` | Generation timestamp. |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL` | `NOW()` | Last modification timestamp. |
| `deleted_at` | `TIMESTAMPTZ` | - | - | Soft deletion timestamp. |
| `uploader_ip_hash` | `CHAR(64)` | `NOT NULL` | - | SHA-256 hash of the uploader's IP address. |

---

## 2. Parse Jobs (`parse_jobs`)

Monitors the state of background parsing jobs.

| Column Name | Data Type | Constraints | Default Value | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY` | `gen_random_uuid()` | Unique job identifier. |
| `portfolio_id` | `UUID` | `FOREIGN KEY` references `portfolios(id)` (ON DELETE CASCADE) | - | Target portfolio being parsed. |
| `status` | `parse_status_enum` | `NOT NULL` | `'pending'` | Pipeline execution state. |
| `error_message` | `TEXT` | - | - | Parsing stack trace / error description. |
| `started_at` | `TIMESTAMPTZ` | `NOT NULL` | `NOW()` | Start timestamp. |
| `finished_at` | `TIMESTAMPTZ` | - | - | Completion timestamp. |

---

## 3. Upload Limits (`upload_limits`)

Implements sliding rate limits to protect upload endpoints.

| Column Name | Data Type | Constraints | Default Value | Description |
| :--- | :--- | :--- | :--- | :--- |
| `ip_hash` | `CHAR(64)` | `PRIMARY KEY` | - | SHA-256 hash of the user's IP. |
| `uploads_last_hour` | `INTEGER` | `NOT NULL` | `0` | Number of uploads within the current rate window. |
| `last_upload_at` | `TIMESTAMPTZ` | `NOT NULL` | `NOW()` | Last upload timestamp. |
