'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { saveUpload } from '@/lib/media-storage';

function readPageFields(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim();
  const slug = String(formData.get('slug') ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const body = String(formData.get('body') ?? '').trim();

  if (!title || !slug || !body) {
    throw new Error('Title, slug, and body are required.');
  }

  return { title, slug, body };
}

async function maybeUploadPhoto(formData: FormData): Promise<string | null> {
  const file = formData.get('photo');
  if (file instanceof File && file.size > 0) {
    const { url } = await saveUpload(file);
    return url;
  }
  return null;
}

export async function createPage(formData: FormData) {
  const fields = readPageFields(formData);
  const photoUrl = await maybeUploadPhoto(formData);

  await prisma.page.create({ data: { ...fields, photoUrl } });

  revalidatePath('/admin/pages');
  revalidatePath('/', 'layout');
  redirect('/admin/pages');
}

export async function updatePage(id: string, formData: FormData) {
  const fields = readPageFields(formData);
  const photoUrl = await maybeUploadPhoto(formData);

  await prisma.page.update({
    where: { id },
    data: { ...fields, ...(photoUrl ? { photoUrl } : {}) },
  });

  revalidatePath('/admin/pages');
  revalidatePath('/', 'layout');
  redirect('/admin/pages');
}

export async function deletePage(id: string) {
  await prisma.page.delete({ where: { id } });

  revalidatePath('/admin/pages');
  revalidatePath('/', 'layout');
}
