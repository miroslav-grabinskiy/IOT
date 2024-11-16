import { kafkaConfig } from "../../configs/config";
import { consumer } from "../queue.service";
import { IRssiMessage } from "../types/IRssiMessage";
import { saveDataAndCheckAlert } from "./saveDataAndCheckAlert.event";

export async function startConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: kafkaConfig.topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value?.toString() || "{}") as IRssiMessage;
      await saveDataAndCheckAlert(data);
  });
}