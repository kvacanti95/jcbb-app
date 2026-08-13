'use server';

import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';

async function assertNotLastAdmin(excludeUserId: string) {
  const otherAdmins = await prisma.user.count({
    where: { role: 'ADMIN', id: { not: excludeUserId } },
  });
  if (otherAdmins === 0) {
    throw new Error('Cannot remove the last remaining admin account.');
  }
}

export async function createUser(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const name = String(formData.get('name') ?? '').trim();
  const role = formData.get('role') === 'FIGHTER' ? 'FIGHTER' : 'ADMIN';
  const fighterId = String(formData.get('fighterId') ?? '').trim();

  if (!email || !password || !name) {
    throw new Error('Email, password, and name are required.');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, passwordHash, name, role },
  });

  if (role === 'FIGHTER' && fighterId) {
    await prisma.fighter.update({ where: { id: fighterId }, data: { userId: user.id } });
  }

  revalidatePath('/admin/users');
  redirect('/admin/users');
}

export async function updateUser(id: string, formData: FormData) {
  const name = String(formData.get('name') ?? '').trim();
  const role = formData.get('role') === 'FIGHTER' ? 'FIGHTER' : 'ADMIN';
  const password = String(formData.get('password') ?? '');
  const fighterId = String(formData.get('fighterId') ?? '').trim();

  if (!name) {
    throw new Error('Name is required.');
  }

  const existing = await prisma.user.findUniqueOrThrow({ where: { id } });
  if (existing.role === 'ADMIN' && role !== 'ADMIN') {
    await assertNotLastAdmin(id);
  }

  const data: { name: string; role: 'ADMIN' | 'FIGHTER'; passwordHash?: string } = { name, role };
  if (password) {
    data.passwordHash = await bcrypt.hash(password, 10);
  }

  await prisma.user.update({ where: { id }, data });

  // Unlink whatever fighter this user was previously linked to, then
  // (re)link to the one selected, if any — keeps the 1:1 relationship clean.
  await prisma.fighter.updateMany({ where: { userId: id }, data: { userId: null } });
  if (role === 'FIGHTER' && fighterId) {
    await prisma.fighter.update({ where: { id: fighterId }, data: { userId: id } });
  }

  revalidatePath('/admin/users');
  redirect('/admin/users');
}

export async function deleteUser(id: string) {
  const existing = await prisma.user.findUniqueOrThrow({ where: { id } });
  if (existing.role === 'ADMIN') {
    await assertNotLastAdmin(id);
  }

  await prisma.fighter.updateMany({ where: { userId: id }, data: { userId: null } });
  await prisma.user.delete({ where: { id } });

  revalidatePath('/admin/users');
}
