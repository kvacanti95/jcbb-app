import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from './generated/prisma/client';

type ExtendedPrismaClient = ReturnType<typeof buildExtendedClient>;

declare global {
  // eslint-disable-next-line no-var
  var __prismaRaw: PrismaClient | undefined;
  // eslint-disable-next-line no-var
  var __prismaExtended: ExtendedPrismaClient | undefined;
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

function getRawClient(): PrismaClient {
  if (!globalThis.__prismaRaw) {
    globalThis.__prismaRaw = createRawClient();
  }
  return globalThis.__prismaRaw;
}

function ensureBootstrapped(raw: PrismaClient): Promise<void> {
  if (!globalThis.__bootstrapPromise) {
    globalThis.__bootstrapPromise = import('./schema-bootstrap').then((m) =>
      m.bootstrapDatabase(raw),
    );
  }
  return globalThis.__bootstrapPromise;
}

// Next's `instrumentation.ts` hook does not reliably fire in `output:
// standalone` builds (confirmed empirically), so schema bootstrap instead
// runs lazily, once, before the first real query — no dependency on that
// Next.js feature working correctly in this deployment target.
function buildExtendedClient(raw: PrismaClient) {
  return raw.$extends({
    query: {
      async $allOperations({ args, query }) {
        await ensureBootstrapped(raw);
        return query(args);
      },
    },
  });
}

function getExtendedClient(): ExtendedPrismaClient {
  if (!globalThis.__prismaExtended) {
    globalThis.__prismaExtended = buildExtendedClient(getRawClient());
  }
  return globalThis.__prismaExtended;
}

// A Proxy defers actually constructing the client (and reading
// DATABASE_URL) until a query is really made. Next's build-time
// "collecting page data" step imports every route module — including
// this one, transitively, via lib/auth.ts — without executing anything,
// and that environment has no DATABASE_URL. Constructing the client
// eagerly at module scope would break the production build.
export const prisma = new Proxy({} as ExtendedPrismaClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getExtendedClient() as object, prop, receiver);
  },
});
