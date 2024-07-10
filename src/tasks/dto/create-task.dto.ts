import { IsString, IsEnum } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';
export class CreateTaskDto {

  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsEnum(TaskStatus)
  readonly status: TaskStatus;
}
