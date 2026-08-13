'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { deleteUpload, saveUpload } from '@/lib/media-storage';

function readFighterFields(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim();
  const weightClass = String(formData.get('weightClass') ?? '').trim();
  const wins = Number(formData.get('wins') ?? 0);
  const losses = Number(formData.get('losses') ?? 0);
  const draws = Number(formData.get('draws') ?? 0);
  const bio = String(formData.get('bio') ?? '').trim();

  if (!name || !weightClass || !bio) {
    throw new Error('Name, weight class, and bio are required.');
  }

  return {
    name,
    weightClass,
    wins: Number.isFinite(wins) ? wins : 0,
    losses: Number.isFinite(losses) ? losses : 0,
    draws: Number.isFinite(draws) ? draws : 0,
    bio,
  };
}

async function maybeUploadPhoto(formData: FormData): Promise<string | null> {
  const file = formData.get('photo');
  if (file instanceof File && file.size > 0) {
    const { url } = await saveUpload(file);
    return url;
  }
  return null;
}

export async function createFighter(formData: FormData) {
  const fields = readFighterFields(formData);
  const photoUrl = await maybeUploadPhoto(formData);
  const maxSortOrder = await prisma.fighter.count();

  await prisma.fighter.create({
    data: { ...fields, photoUrl, sortOrder: maxSortOrder },
  });

  revalidatePath('/admin/fighters');
  revalidatePath('/fighters');
  redirect('/admin/fighters');
}

export async function updateFighter(id: string, formData: FormData) {
  const fields = readFighterFields(formData);
  const photoUrl = await maybeUploadPhoto(formData);

  await prisma.fighter.update({
    where: { id },
    data: { ...fields, ...(photoUrl ? { photoUrl } : {}) },
  });

  revalidatePath('/admin/fighters');
  revalidatePath('/fighters');
  revalidatePath('/admin/my-profile');
  redirect('/admin/fighters');
}

export async function deleteFighter(id: string) {
  await prisma.fighter.delete({ where: { id } });

  revalidatePath('/admin/fighters');
  revalidatePath('/fighters');
}
