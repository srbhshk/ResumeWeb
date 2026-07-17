import fs from 'fs';
import path from 'path';
import { uploadFile } from '@/lib/storage';

describe('Storage Utility - uploadFile', () => {
  const testBuffer = Buffer.from('dummy-pdf-content');
  const testFilename = 'test-resume.pdf';

  afterAll(() => {
    // Cleanup any files written during local tests
    const resumesDir = path.join(process.cwd(), 'public', 'uploads', 'resumes');
    if (fs.existsSync(resumesDir)) {
      const files = fs.readdirSync(resumesDir);
      for (const file of files) {
        if (file.startsWith('test-resume-')) {
          fs.unlinkSync(path.join(resumesDir, file));
        }
      }
    }
  });

  it('should save file to public/uploads/resumes and return local public path in local/test environment', async () => {
    // Force development/local mode
    const url = await uploadFile(testBuffer, testFilename, 'resumes');

    expect(url).toContain('/uploads/resumes/test-resume-');
    expect(url.endsWith('.pdf')).toBe(true);

    // Verify file actually got written to filesystem
    const relativePath = url.replace(/^\/uploads/, '');
    const actualFilePath = path.join(process.cwd(), 'public', 'uploads', relativePath);
    expect(fs.existsSync(actualFilePath)).toBe(true);
    expect(fs.readFileSync(actualFilePath, 'utf-8')).toBe('dummy-pdf-content');
  });

  it('should support uploading photos to public/uploads/photos', async () => {
    const photoBuffer = Buffer.from('dummy-image-content');
    const photoFilename = 'headshot.png';
    const url = await uploadFile(photoBuffer, photoFilename, 'photos');

    expect(url).toContain('/uploads/photos/headshot-');
    expect(url.endsWith('.png')).toBe(true);

    // Cleanup photo file
    const relativePath = url.replace(/^\/uploads/, '');
    const actualFilePath = path.join(process.cwd(), 'public', 'uploads', relativePath);
    expect(fs.existsSync(actualFilePath)).toBe(true);
    fs.unlinkSync(actualFilePath);
  });
});
