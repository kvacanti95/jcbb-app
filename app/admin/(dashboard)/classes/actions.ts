'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';

function readClassFields(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const level = String(formData.get('level') ?? '').trim();
  const duration = String(formData.get('duration') ?? '').trim();

  if (!name || !description || !level || !duration) {
    throw new Error('Name, description, level, and duration are required.');
  }

  return { name, description, level, duration };
}

export async function createClass(formData: FormData) {
  const fields = readClassFields(formData);
  const maxSortOrder = await prisma.class.count();

  await prisma.class.create({ data: { ...fields, sortOrder: maxSortOrder } });

  revalidatePath('/admin/classes');
  revalidatePath('/classes');
  revalidatePath('/', 'layout');
  revalidatePath('/admin/schedule');
  redirect('/admin/classes');
}

export async function updateClass(id: string, formData: FormData) {
  const fields = readClassFields(formData);

  await prisma.class.update({ where: { id }, data: fields });

  revalidatePath('/admin/classes');
  revalidatePath('/classes');
  revalidatePath('/', 'layout');
  revalidatePath('/admin/schedule');
  redirect('/admin/classes');
}

export async function deleteClass(id: string) {
  await prisma.class.delete({ where: { id } });

  revalidatePath('/admin/classes');
  revalidatePath('/classes');
  revalidatePath('/', 'layout');
  revalidatePath('/admin/schedule');
}
