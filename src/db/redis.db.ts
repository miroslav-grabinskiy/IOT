import redis from 'redis';
import { redisConfig } from '../configs/config';

export const redisClient = redis.createClient({
  url: `redis://${redisConfig.host}:${redisConfig.port}`,
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis error: ', err);
});

export function stop() {
  redisClient.quit();
}