import { ApiProperty } from '@nestjs/swagger';

export class CreateSensorReadingDto {
  @ApiProperty({ example: 22.5 })
  temperature: number;

  @ApiProperty({ example: 60 })
  humidity: number;

  @ApiProperty({ example: 'plant-abc' })
  plantId: string;
}
