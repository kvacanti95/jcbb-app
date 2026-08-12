import { readFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { UPLOADS_DIR } from '@/lib/media-storage';

const CONTENT_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.mp4': 'video/mp4',
  '.mov': 'video/quicktime',
  '.webm': 'video/webm',
};

export async function GET(_request: Request, { params }: { params: { filename: string } }) {
  const filename = params.filename;

  // Reject path traversal / anything that isn't a plain filename.
  if (!filename || filename.includes('/') || filename.includes('..')) {
    return new NextResponse('Not found', { status: 404 });
  }

  const filePath = path.join(UPLOADS_DIR, filename);

  try {
    const data = await readFile(filePath);
    const ext = path.extname(filename).toLowerCase();
    const contentType = CONTENT_TYPES[ext] ?? 'application/octet-stream';

    return new NextResponse(data, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}
