import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sensor } from './sensor.schema';

@Injectable()
export class SensorService {
  constructor(@InjectModel(Sensor.name) private sensorModel: Model<Sensor>) {}

  async create(data: Partial<Sensor>): Promise<Sensor> {
    return this.sensorModel.create(data);
  }

  async findAll(): Promise<Sensor[]> {
    return this.sensorModel.find().sort({ createdAt: -1 }).exec();
  }
}
