import DeviceData from "./device.schema.db";
import { IDeviceData } from "./device.schema.db";
import { OFFLINE_TIME_THRESHOLD } from "../../configs/config";

export async function save(data: {
  deviceId: string;
  zoneId: string;
  rssiLevel: number;
  timestamp: number;
  isOffline: boolean;
}) {
  try {
    const { deviceId, zoneId, rssiLevel, timestamp, isOffline } = data;

    const newDeviceData: IDeviceData = new DeviceData({
      deviceId,
      zoneId,
      rssiLevel,
      timestamp,
      isOffline,
    });

    await newDeviceData.save();
    console.log("Data saved successfully:", newDeviceData);
  } catch (error) {
    console.error("Error saving device data:", error);
    throw error;
  }
}

export async function isOffline(deviceId: string): Promise<boolean> {
  try {
    const currentTime = Date.now();
    const thresholdTime = currentTime - OFFLINE_TIME_THRESHOLD;

    const deviceData = await DeviceData.find({
      deviceId,
      timestamp: { $gte: thresholdTime },
    }).sort({ timestamp: -1 });

    const allOffline = deviceData.every((data) => data.isOffline === true);

    //fixme: do it in query request

    return allOffline;
  } catch (error) {
    console.error("Error checking device offline status:", error);
    return false;
  }
}