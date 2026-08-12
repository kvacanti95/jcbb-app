'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';

export async function addScheduleClass(formData: FormData) {
  const dayOfWeek = Number(formData.get('dayOfWeek'));
  const time = String(formData.get('time') ?? '').trim();
  const className = String(formData.get('className') ?? '').trim();
  const coachName = String(formData.get('coachName') ?? '').trim();

  if (Number.isNaN(dayOfWeek) || !time || !className || !coachName) {
    throw new Error('Day, time, class, and coach are all required.');
  }

  const sortOrder = await prisma.scheduleClass.count({ where: { dayOfWeek } });

  await prisma.scheduleClass.create({
    data: { dayOfWeek, time, className, coachName, sortOrder },
  });

  revalidatePath('/admin/schedule');
  revalidatePath('/schedule');
}

export async function deleteScheduleClass(id: string) {
  await prisma.scheduleClass.delete({ where: { id } });

  revalidatePath('/admin/schedule');
  revalidatePath('/schedule');
}
