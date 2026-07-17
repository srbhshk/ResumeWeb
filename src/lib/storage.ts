import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

/**
 * Uploads a file buffer to storage.
 * In production, uploads to Vercel Blob Storage.
 * In local development, saves to the public/uploads folder.
 *
 * @param buffer - File data as a Buffer.
 * @param filename - Name of the file.
 * @param folder - Destination category ('resumes' or 'photos').
 * @returns The public URL of the uploaded file.
 */
export async function uploadFile(
  buffer: Buffer,
  filename: string,
  folder: 'resumes' | 'photos',
): Promise<string> {
  const token = process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_BLOB_TOKEN;

  // Check if we should use local filesystem mock
  const isLocalDev =
    !token ||
    token.startsWith('local-dev') ||
    process.env.NODE_ENV === 'test' ||
    process.env.NODE_ENV === 'development';

  if (isLocalDev) {
    // Generate clean safe filename with timestamp to prevent collisions
    const fileExtension = path.extname(filename);
    const baseName = path.basename(filename, fileExtension);
    const uniqueFilename = `${baseName}-${Date.now()}${fileExtension}`;

    // Target directory path in public folder
    const targetDir = path.join(process.cwd(), 'public', 'uploads', folder);

    // Ensure the folder structure exists
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const filePath = path.join(targetDir, uniqueFilename);
    fs.writeFileSync(filePath, buffer);

    // Return local public asset link
    return `/uploads/${folder}/${uniqueFilename}`;
  }

  // Upload to production Vercel Blob Storage
  const uniqueName = `${folder}/${Date.now()}-${filename}`;
  const response = await put(uniqueName, buffer, {
    access: 'public',
    token: token,
  });

  return response.url;
}
