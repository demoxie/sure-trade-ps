import { config } from 'dotenv';
config();
const { env } = process;
const { REDIS_HOST, REDIS_PORT } = env;

export const RedisConfig = () => ({
  redis: {
    host: REDIS_HOST,
    port: parseInt(REDIS_PORT, 10) || 6379,
  },
});
