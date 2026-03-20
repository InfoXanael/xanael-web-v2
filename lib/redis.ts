import Redis from "ioredis";

const globalForRedis = globalThis as unknown as { redis?: Redis };

function getRedis(): Redis | null {
  if (!process.env.REDIS_URL) return null;
  if (!globalForRedis.redis) {
    globalForRedis.redis = new Redis(process.env.REDIS_URL, {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
    });
  }
  return globalForRedis.redis;
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  const redis = getRedis();
  if (!redis) return null;
  try {
    const val = await redis.get(key);
    return val ? (JSON.parse(val) as T) : null;
  } catch {
    return null;
  }
}

export async function cacheSet(key: string, data: unknown, ttl = 300): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    await redis.setex(key, ttl, JSON.stringify(data));
  } catch {
    // silently degrade — DB response already returned
  }
}

export async function cacheInvalidate(pattern: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) await redis.del(...keys);
  } catch {
    // silently degrade
  }
}
