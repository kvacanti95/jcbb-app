import bcrypt from 'bcryptjs';
import type { PrismaClient } from './generated/prisma/client';
import { coaches as defaultCoaches, schedule as defaultSchedule } from './site-data';

const DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

async function createTables(db: PrismaClient) {
  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "User" (
      "id" TEXT PRIMARY KEY,
      "email" TEXT UNIQUE NOT NULL,
      "passwordHash" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Event" (
      "id" TEXT PRIMARY KEY,
      "title" TEXT NOT NULL,
      "opponent" TEXT,
      "eventDate" DATETIME NOT NULL,
      "location" TEXT NOT NULL,
      "description" TEXT,
      "ticketLink" TEXT,
      "posterImageUrl" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL
    )
  `);

  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "MediaItem" (
      "id" TEXT PRIMARY KEY,
      "url" TEXT NOT NULL,
      "filename" TEXT NOT NULL,
      "type" TEXT NOT NULL,
      "caption" TEXT,
      "eventId" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY ("eventId") REFERENCES "Event" ("id")
    )
  `);

  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Coach" (
      "id" TEXT PRIMARY KEY,
      "name" TEXT NOT NULL,
      "role" TEXT NOT NULL,
      "bio" TEXT NOT NULL,
      "photoUrl" TEXT,
      "sortOrder" INTEGER NOT NULL DEFAULT 0,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL
    )
  `);

  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "ScheduleClass" (
      "id" TEXT PRIMARY KEY,
      "dayOfWeek" INTEGER NOT NULL,
      "time" TEXT NOT NULL,
      "className" TEXT NOT NULL,
      "coachName" TEXT NOT NULL,
      "sortOrder" INTEGER NOT NULL DEFAULT 0,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL
    )
  `);

  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "SiteSetting" (
      "key" TEXT PRIMARY KEY,
      "value" TEXT NOT NULL,
      "updatedAt" DATETIME NOT NULL
    )
  `);
}

async function upsertAdminAccounts(db: PrismaClient) {
  const accounts = [
    { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD, name: 'Kevin' },
    { email: process.env.COACH_EMAIL, password: process.env.COACH_PASSWORD, name: 'Coach Tim' },
  ];

  for (const account of accounts) {
    if (!account.email || !account.password) {
      console.warn(
        `[bootstrap] Skipping admin account "${account.name}" — missing email/password env vars.`,
      );
      continue;
    }
    const passwordHash = await bcrypt.hash(account.password, 10);
    await db.user.upsert({
      where: { email: account.email },
      update: { passwordHash, name: account.name },
      create: { email: account.email, passwordHash, name: account.name },
    });
  }
}

async function seedCoachesIfEmpty(db: PrismaClient) {
  const count = await db.coach.count();
  if (count > 0) return;

  for (let i = 0; i < defaultCoaches.length; i++) {
    const coach = defaultCoaches[i];
    await db.coach.create({
      data: { name: coach.name, role: coach.role, bio: coach.bio, sortOrder: i },
    });
  }
}

async function seedScheduleIfEmpty(db: PrismaClient) {
  const count = await db.scheduleClass.count();
  if (count > 0) return;

  for (const day of defaultSchedule) {
    const dayOfWeek = DAY_ORDER.indexOf(day.day);
    for (let i = 0; i < day.classes.length; i++) {
      const cls = day.classes[i];
      await db.scheduleClass.create({
        data: {
          dayOfWeek,
          time: cls.time,
          className: cls.name,
          coachName: cls.coach,
          sortOrder: i,
        },
      });
    }
  }
}

export async function bootstrapDatabase(db: PrismaClient) {
  try {
    await createTables(db);
    await upsertAdminAccounts(db);
    await seedCoachesIfEmpty(db);
    await seedScheduleIfEmpty(db);
    console.log('[bootstrap] Database schema ready.');
  } catch (err) {
    console.error('[bootstrap] Failed to bootstrap database:', err);
  }
}
