import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PageOptionsDto } from './dto/page-options.dto';
import { PageMetaDto } from './dto/page-meta.dto';
import { PageDto } from './dto/page.dto';
import { GetTaskDto } from './dto/get-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    try {
      const task = await this.taskRepository.create(createTaskDto);
      return await this.taskRepository.save(task);
    } catch (error) {
      if (error.constraint == 'UQ_3399e2710196ea4bf734751558f') {
        throw new ConflictException(`This title already in use`);
      }
      throw error;
    }
  }

  async getTasks(pageOptionsDto: PageOptionsDto): Promise<PageDto<GetTaskDto>> {
    const queryBuilder = this.taskRepository.createQueryBuilder('task');

    queryBuilder
      .orderBy('task.created_at', pageOptionsDto.order)
      .addOrderBy('task.status', pageOptionsDto.orderByStatus)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const result = await queryBuilder.getManyAndCount();
    const [entities, itemCount] = result;
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`There's no task under this id = ${id}`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.findOne(id);
      Object.assign(task, updateTaskDto);
      return await this.taskRepository.save(task);
    } catch (error) {
      if (error.constraint == 'UQ_3399e2710196ea4bf734751558f') {
        throw new ConflictException(`This title already in use`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    const task = await this.findOne(id);
    await this.taskRepository.delete({ id: task.id });
    return { message: 'Task removed successfully!' };
  }
}
