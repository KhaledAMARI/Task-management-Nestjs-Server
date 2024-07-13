import { ApiProperty } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';

export class GetTaskDto extends CreateTaskDto {
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @ApiProperty({ type: Date, example: new Date() })
  created_at: Date;

  @ApiProperty({ type: Date, example: new Date() })
  updated_at: Date;
}