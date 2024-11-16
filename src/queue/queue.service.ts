import { Kafka } from "kafkajs";
import { kafkaConfig } from "../configs/config";
import * as queueConsumer from "./handle/handle.queue.service";

const kafka = new Kafka({
  clientId: kafkaConfig.clientId,
  brokers: kafkaConfig.brokers,
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: kafkaConfig.groupId });

export async function start() {
  queueConsumer.startConsumer().catch(console.error);
}

export async function stop() {
  await producer.disconnect();
  await consumer.disconnect();
}
