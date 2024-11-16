import { ServerResponse } from "http";
import { RSSI_THRESHOLD, OFFLINE_TIME_THRESHOLD } from "../../configs/config";
import { IRSSIData } from "./types.controller.http";
import { sendRSSIMessage } from "../../queue/emit/emit.queue.service";

export async function collectRSSI(data: IRSSIData, res: ServerResponse) {
  try {
    if (!validate(data, res)) return; //better change validate to throwable, but dont have time;
    await sendRSSIMessage(data); //need to handle kafka errors here?

    res.statusCode = 200;
    res.end("RSSI data processed successfully");
  } catch (error) {
    console.error("Error processing RSSI data:", error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}

function validate(data: IRSSIData, res: ServerResponse): boolean {
  if (
    typeof data.deviceId !== "string" ||
    typeof data.rssiLevel !== "number" ||
    typeof data.zoneId !== "string" ||
    !data.deviceId ||
    !data.zoneId
  ) {
    res.statusCode = 400;
    res.end("Invalid data: Missing deviceId or rssiLevel");
    return false; //better change it to throw, but dont have time now;
  }
  return true;
}
