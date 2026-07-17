-- Initialize ResumeWeb DB Schema
CREATE TYPE parse_status_enum AS ENUM ('pending', 'processing', 'success', 'error');

-- 1. Table: portfolios
CREATE TABLE portfolios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(32) NOT NULL CONSTRAINT unique_portfolio_slug UNIQUE,
    edit_token_jwt TEXT NOT NULL CONSTRAINT unique_portfolio_edit_token UNIQUE,
    pdf_blob_url TEXT NOT NULL,
    photo_blob_url TEXT,
    parse_status parse_status_enum NOT NULL DEFAULT 'pending',
    parse_error_message TEXT,
    summary TEXT,
    experience_json JSONB DEFAULT '[]'::jsonb,
    skills_json JSONB DEFAULT '[]'::jsonb,
    education_json JSONB DEFAULT '[]'::jsonb,
    projects_json JSONB DEFAULT '[]'::jsonb,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    allow_search_indexing BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE,
    uploader_ip_hash CHAR(64) NOT NULL
);

-- 2. Table: parse_jobs
CREATE TABLE parse_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
    status parse_status_enum NOT NULL DEFAULT 'pending',
    error_message TEXT,
    started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    finished_at TIMESTAMP WITH TIME ZONE
);

-- 3. Table: upload_limits
CREATE TABLE upload_limits (
    ip_hash CHAR(64) PRIMARY KEY,
    uploads_last_hour INTEGER NOT NULL DEFAULT 0,
    last_upload_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 4. Indexes for performance optimizations
CREATE INDEX idx_portfolios_is_published ON portfolios (is_published) WHERE deleted_at IS NULL;
CREATE INDEX idx_portfolios_uploader_ip_hash ON portfolios (uploader_ip_hash);
CREATE INDEX idx_portfolios_deleted_at ON portfolios (deleted_at) WHERE deleted_at IS NOT NULL;
CREATE INDEX idx_parse_jobs_portfolio_id ON parse_jobs (portfolio_id);

-- 5. Auto-update trigger for updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_portfolios_updated_at
BEFORE UPDATE ON portfolios
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
