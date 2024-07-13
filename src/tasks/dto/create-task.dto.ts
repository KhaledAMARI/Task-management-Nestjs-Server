import { IsString, IsEnum } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';
import { ApiProperty } from '@nestjs/swagger';
export class CreateTaskDto {
  @ApiProperty({ type: String, example: 'task 1' })
  @IsString()
  readonly title: string;

  @ApiProperty({ type: String, example: 'description task 1' })
  @IsString()
  readonly description: string;

  @ApiProperty({ enum: TaskStatus, default: TaskStatus.DONE })
  @IsEnum(TaskStatus)
  readonly status: TaskStatus;
}
