import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) { }
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

  findAll() {
    return this.taskRepository.find();
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
    return { message: 'Task removed successfully!' }
  }
}
