'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { deleteUpload, saveUpload } from '@/lib/media-storage';

function readEventFields(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim();
  const opponent = String(formData.get('opponent') ?? '').trim();
  const eventDate = String(formData.get('eventDate') ?? '');
  const location = String(formData.get('location') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const ticketLink = String(formData.get('ticketLink') ?? '').trim();

  if (!title || !eventDate || !location) {
    throw new Error('Title, date, and location are required.');
  }

  return {
    title,
    opponent: opponent || null,
    eventDate: new Date(eventDate),
    location,
    description: description || null,
    ticketLink: ticketLink || null,
  };
}

async function maybeUploadPoster(formData: FormData): Promise<string | null> {
  const file = formData.get('poster');
  if (file instanceof File && file.size > 0) {
    const { url } = await saveUpload(file);
    return url;
  }
  return null;
}

export async function createEvent(formData: FormData) {
  const fields = readEventFields(formData);
  const posterImageUrl = await maybeUploadPoster(formData);

  await prisma.event.create({
    data: { ...fields, posterImageUrl },
  });

  revalidatePath('/admin/events');
  revalidatePath('/events');
  redirect('/admin/events');
}

export async function updateEvent(id: string, formData: FormData) {
  const fields = readEventFields(formData);
  const posterImageUrl = await maybeUploadPoster(formData);

  await prisma.event.update({
    where: { id },
    data: { ...fields, ...(posterImageUrl ? { posterImageUrl } : {}) },
  });

  revalidatePath('/admin/events');
  revalidatePath('/events');
  redirect('/admin/events');
}

export async function deleteEvent(id: string) {
  const mediaItems = await prisma.mediaItem.findMany({ where: { eventId: id } });
  for (const item of mediaItems) {
    await deleteUpload(item.filename);
  }
  await prisma.mediaItem.deleteMany({ where: { eventId: id } });
  await prisma.event.delete({ where: { id } });

  revalidatePath('/admin/events');
  revalidatePath('/admin/media');
  revalidatePath('/events');
  revalidatePath('/gallery');
}
