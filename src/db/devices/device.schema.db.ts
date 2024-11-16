// models/DeviceData.ts
import { Schema, model, Document } from 'mongoose';

export interface IDeviceData extends Document {
  deviceId: string;
  zoneId: string;
  rssiLevel: number;
  timestamp: number;
  isOffline: boolean;
}

const DeviceDataSchema = new Schema<IDeviceData>({
  deviceId: { type: String, required: true },
  zoneId: { type: String, required: true },
  rssiLevel: { type: Number, required: true },
  timestamp: { type: Number, required: true },
  isOffline: { type: Boolean, required: true, default: false },
});

const DeviceData = model<IDeviceData>('DeviceData', DeviceDataSchema);

export default DeviceData;
