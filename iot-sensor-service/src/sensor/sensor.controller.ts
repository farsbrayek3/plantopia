import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSensorReadingDto } from './dto/create-sensor-reading.dto';
import { ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';

@ApiTags('Sensors')
@Controller('sensor')
export class SensorController {
  private readings: CreateSensorReadingDto[] = [];

  @Get()
  @ApiOperation({ summary: 'Get all sensor readings' })
  findAll() {
    return this.readings;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new sensor reading' })
  @ApiBody({ type: CreateSensorReadingDto })
  create(@Body() dto: CreateSensorReadingDto) {
    this.readings.push(dto);
    return { message: 'Sensor reading added', data: dto };
  }
}
