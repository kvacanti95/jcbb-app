import bcrypt from 'bcryptjs';
import type { PrismaClient } from './generated/prisma/client';
import {
  classes as defaultClasses,
  coaches as defaultCoaches,
  schedule as defaultSchedule,
} from './site-data';

const DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

async function ensureColumn(db: PrismaClient, table: string, column: string, definition: string) {
  const columns = await db.$queryRawUnsafe<{ name: string }[]>(`PRAGMA table_info("${table}")`);
  const exists = columns.some((c) => c.name === column);
  if (!exists) {
    await db.$executeRawUnsafe(`ALTER TABLE "${table}" ADD COLUMN ${definition}`);
  }
}

async function createTables(db: PrismaClient) {
  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "User" (
      "id" TEXT PRIMARY KEY,
      "email" TEXT UNIQUE NOT NULL,
      "passwordHash" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "role" TEXT NOT NULL DEFAULT 'ADMIN',
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  // Existing deployed databases already have a User table without "role" —
  // CREATE TABLE IF NOT EXISTS is a no-op there, so add it explicitly.
  await ensureColumn(db, 'User', 'role', `"role" TEXT NOT NULL DEFAULT 'ADMIN'`);

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

  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Fighter" (
      "id" TEXT PRIMARY KEY,
      "name" TEXT NOT NULL,
      "weightClass" TEXT NOT NULL,
      "wins" INTEGER NOT NULL DEFAULT 0,
      "losses" INTEGER NOT NULL DEFAULT 0,
      "draws" INTEGER NOT NULL DEFAULT 0,
      "kos" INTEGER NOT NULL DEFAULT 0,
      "bio" TEXT NOT NULL,
      "photoUrl" TEXT,
      "hidden" INTEGER NOT NULL DEFAULT 0,
      "sortOrder" INTEGER NOT NULL DEFAULT 0,
      "userId" TEXT UNIQUE,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL
    )
  `);
  // Fighter already existed before "kos"/"hidden" were added — same
  // in-place migration approach as User.role above.
  await ensureColumn(db, 'Fighter', 'kos', `"kos" INTEGER NOT NULL DEFAULT 0`);
  await ensureColumn(db, 'Fighter', 'hidden', `"hidden" INTEGER NOT NULL DEFAULT 0`);

  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Page" (
      "id" TEXT PRIMARY KEY,
      "slug" TEXT UNIQUE NOT NULL,
      "title" TEXT NOT NULL,
      "body" TEXT NOT NULL,
      "photoUrl" TEXT,
      "published" INTEGER NOT NULL DEFAULT 1,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL
    )
  `);
  // Page already existed before "published" was added.
  await ensureColumn(db, 'Page', 'published', `"published" INTEGER NOT NULL DEFAULT 1`);

  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Class" (
      "id" TEXT PRIMARY KEY,
      "name" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "level" TEXT NOT NULL,
      "duration" TEXT NOT NULL,
      "sortOrder" INTEGER NOT NULL DEFAULT 0,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
      update: { passwordHash, name: account.name, role: 'ADMIN' },
      create: { email: account.email, passwordHash, name: account.name, role: 'ADMIN' },
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

async function seedClassesIfEmpty(db: PrismaClient) {
  const count = await db.class.count();
  if (count > 0) return;

  for (let i = 0; i < defaultClasses.length; i++) {
    const cls = defaultClasses[i];
    await db.class.create({
      data: {
        name: cls.name,
        description: cls.description,
        level: cls.level,
        duration: cls.duration,
        sortOrder: i,
      },
    });
  }
}

export async function bootstrapDatabase(db: PrismaClient) {
  try {
    await createTables(db);
    await upsertAdminAccounts(db);
    await seedCoachesIfEmpty(db);
    await seedScheduleIfEmpty(db);
    await seedClassesIfEmpty(db);
    console.log('[bootstrap] Database schema ready.');
  } catch (err) {
    console.error('[bootstrap] Failed to bootstrap database:', err);
  }
}
