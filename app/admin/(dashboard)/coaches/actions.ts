'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { deleteUpload, saveUpload } from '@/lib/media-storage';

function readCoachFields(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim();
  const role = String(formData.get('role') ?? '').trim();
  const bio = String(formData.get('bio') ?? '').trim();

  if (!name || !role || !bio) {
    throw new Error('Name, role, and bio are required.');
  }

  return { name, role, bio };
}

async function maybeUploadPhoto(formData: FormData): Promise<string | null> {
  const file = formData.get('photo');
  if (file instanceof File && file.size > 0) {
    const { url } = await saveUpload(file);
    return url;
  }
  return null;
}

export async function createCoach(formData: FormData) {
  const fields = readCoachFields(formData);
  const photoUrl = await maybeUploadPhoto(formData);
  const maxSortOrder = await prisma.coach.count();

  await prisma.coach.create({
    data: { ...fields, photoUrl, sortOrder: maxSortOrder },
  });

  revalidatePath('/admin/coaches');
  revalidatePath('/about');
  redirect('/admin/coaches');
}

export async function updateCoach(id: string, formData: FormData) {
  const fields = readCoachFields(formData);
  const photoUrl = await maybeUploadPhoto(formData);

  await prisma.coach.update({
    where: { id },
    data: { ...fields, ...(photoUrl ? { photoUrl } : {}) },
  });

  revalidatePath('/admin/coaches');
  revalidatePath('/about');
  redirect('/admin/coaches');
}

export async function deleteCoach(id: string) {
  await prisma.coach.delete({ where: { id } });

  revalidatePath('/admin/coaches');
  revalidatePath('/about');
}
