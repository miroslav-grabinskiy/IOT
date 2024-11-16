import { RSSI_THRESHOLD } from "../../configs/config";
import * as deviceModel from "../../db/devices/device.model.db";
import * as alertsModel from "../../db/alerts/alerts.model.db";
import { IRssiMessage } from "../types/IRssiMessage";

export async function saveDataAndCheckAlert(data: IRssiMessage) {
  try {
    const isOffline = data.rssiLevel < RSSI_THRESHOLD;
    const zoneId = data.zoneId;

    await deviceModel.save({
      deviceId: data.deviceId,
      rssiLevel: data.rssiLevel,
      zoneId: data.zoneId,
      timestamp: data.timestamp,
      isOffline,
    });

    const deviceAlertData = await alertsModel.getDeviceState(data.deviceId);
    
    if (!isOffline && deviceAlertData?.isSentAlert) {
      await alertsModel.setDeviceState(data.deviceId, zoneId, false)
    }

    const isLongOffline = await deviceModel.isOffline(data.deviceId);
    if (isLongOffline && !deviceAlertData) {
      //TODO: CREATE ALERT DEVICE OFF TO QUEUE

      await alertsModel.setDeviceState(data.deviceId, zoneId, true)

      if (await alertsModel.checkAllZoneDevicesSentAlert(zoneId)) { //last zone device go offline
        //TODO: CREATE ALERT ZONE OFF TO QUEUE
      }
    }
  } catch (err) {
    console.error(err);
  }
}