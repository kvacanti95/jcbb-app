import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from './generated/prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var __prismaRaw: PrismaClient | undefined;
  // eslint-disable-next-line no-var
  var __bootstrapPromise: Promise<void> | undefined;
}

function createRawClient() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is not set');
  }
  const adapter = new PrismaBetterSqlite3({ url });
  return new PrismaClient({ adapter });
}

// Used only by lib/schema-bootstrap.ts, which must bypass the bootstrap-guard
// extension below to avoid deadlocking on itself.
export const rawPrisma = globalThis.__prismaRaw ?? createRawClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prismaRaw = rawPrisma;
}

function ensureBootstrapped(): Promise<void> {
  if (!globalThis.__bootstrapPromise) {
    globalThis.__bootstrapPromise = import('./schema-bootstrap').then((m) =>
      m.bootstrapDatabase(rawPrisma),
    );
  }
  return globalThis.__bootstrapPromise;
}

// Next's `instrumentation.ts` hook does not reliably fire in `output:
// standalone` builds (confirmed empirically), so schema bootstrap instead
// runs lazily, once, before the first real query — no dependency on that
// Next.js feature working correctly in this deployment target.
export const prisma = rawPrisma.$extends({
  query: {
    async $allOperations({ args, query }) {
      await ensureBootstrapped();
      return query(args);
    },
  },
});
