import { randomUUID } from 'crypto';
import { mkdir, unlink, writeFile } from 'fs/promises';
import path from 'path';

// Stored outside `public/` and served via app/uploads/[filename]/route.ts —
// Next's standalone server only snapshots `public/` at boot, so files written
// there at runtime (like admin uploads) 404 until the next restart.
export const UPLOADS_DIR = path.join(process.cwd(), 'data', 'uploads');

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9.-]/g, '-');
}

export async function saveUpload(file: File): Promise<{ url: string; filename: string }> {
  await mkdir(UPLOADS_DIR, { recursive: true });

  const filename = `${randomUUID()}-${sanitizeFilename(file.name)}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOADS_DIR, filename), buffer);

  return { url: `/uploads/${filename}`, filename };
}

export async function deleteUpload(filename: string): Promise<void> {
  try {
    await unlink(path.join(UPLOADS_DIR, filename));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw err;
    }
  }
}
