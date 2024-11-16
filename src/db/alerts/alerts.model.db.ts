import DeviceData from '../devices/device.schema.db';
import { redisClient } from '../redis.db';
import { IDeviceAlertData } from "./alerts.schema.db";

export async function setDeviceState(deviceId: string, zoneId: string, isSentAlert: boolean) {
  try {
    const deviceAlertData: IDeviceAlertData = {
      zoneId: zoneId,
      isSentAlert: isSentAlert,
    };

    await redisClient.hSet(`device:${deviceId}`, 'alert', JSON.stringify({deviceAlertData}));
  } catch (error) {
    console.error('Error setting device state:', error);
  }
};

export async function getDeviceState(deviceId: string): Promise<IDeviceAlertData | null> {
  try {
    const deviceAlertData = await redisClient.hGet(`device:${deviceId}`, 'alert');
    
    return deviceAlertData ? JSON.parse(deviceAlertData) : null;
  } catch (error) {
    console.error('Error getting device state:', error);
    return null;
  }
};

export async function checkAllZoneDevicesSentAlert(zoneId: string): Promise<boolean> {
  try {
    const deviceIds = await redisClient.sMembers(`zone:${zoneId}:devices`);

    if (deviceIds.length === 0) {
      return false;
    }

    const allSentAlert = await Promise.all(
      deviceIds.map(async (deviceId) => {
        const deviceAlertData = await redisClient.hGet(`device:${deviceId}`, 'alert');
        if (deviceAlertData) {
          const parsedData = JSON.parse(deviceAlertData);
          return parsedData.deviceAlertData.isSentAlert === true;
        }
        return false;
      })
    );

    return allSentAlert.every((alertStatus) => alertStatus === true);
  } catch (error) {
    console.error('Error checking devices sent alert status:', error);
    return false;
  }
}


