export const RSSI_THRESHOLD = process.env.RSSI_THRESHOLD ? parseInt(process.env.RSSI_THRESHOLD) : -90;

export const OFFLINE_TIME_THRESHOLD =
  process.env.OFFLINE_TIME_THRESHOLD ? parseInt(process.env.OFFLINE_TIME_THRESHOLD ) : 5 * 60 * 1000;

export const HTTP_PORT = process.env.HTTP_PORT || 3000;

export const kafkaConfig = {
  brokers: process.env.QUEUE_BROKERS || ["localhost:9092"] as Array<string>, //TODO: implement parse array
  clientId: process.env.QUEUE_CLIENT_ID || "rssi-service",
  topic: process.env.QUEUE_TOPIC || "rssi-topic",
  groupId: process.env.QUEUE_GROUP_ID || "rssi-group",
};

export const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
}