import { IRSSIData } from "../../http/controllers/types.controller.http";
import { producer } from "../queue.service";
import { kafkaConfig } from "../../configs/config";
import { IRssiMessage } from "../types/IRssiMessage";

await producer.connect();

export async function sendRSSIMessage(data: IRSSIData) {
  try {
    const { deviceId, rssiLevel, zoneId } = data;

    const message: IRssiMessage = {
      deviceId,
      rssiLevel,
      zoneId,
      timestamp: Date.now(),
    };

    await producer.send({
      topic: kafkaConfig.topic,
      messages: [convertMessage(message)],
    });
  } catch (error) {
    console.error("Error sending message to Kafka:", error);
    throw { message: "Error sending message to Queue", error };
  }
}

function convertMessage(message) {
  return {
    value: JSON.stringify(message),
  };
}