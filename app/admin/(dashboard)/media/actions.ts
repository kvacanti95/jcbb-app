'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { deleteUpload, saveUpload } from '@/lib/media-storage';

export async function uploadMedia(formData: FormData) {
  const file = formData.get('file');
  if (!(file instanceof File) || file.size === 0) {
    throw new Error('Please choose a file to upload.');
  }

  const caption = String(formData.get('caption') ?? '').trim();
  const eventId = String(formData.get('eventId') ?? '').trim();
  const type = file.type.startsWith('video/') ? 'VIDEO' : 'IMAGE';

  const { url, filename } = await saveUpload(file);

  await prisma.mediaItem.create({
    data: {
      url,
      filename,
      type,
      caption: caption || null,
      eventId: eventId || null,
    },
  });

  revalidatePath('/admin/media');
  revalidatePath('/gallery');
}

export async function deleteMedia(id: string) {
  const item = await prisma.mediaItem.findUnique({ where: { id } });
  if (!item) return;

  await deleteUpload(item.filename);
  await prisma.mediaItem.delete({ where: { id } });

  revalidatePath('/admin/media');
  revalidatePath('/gallery');
}
