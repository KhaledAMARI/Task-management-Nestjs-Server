import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PageOptionsDto } from './dto/page-options.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from 'src/docs/api-pagination-response';
import { GetTaskDto } from './dto/get-task.dto';

@ApiTags('tasdocs')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @ApiPaginatedResponse(GetTaskDto)
  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.tasksService.getTasks(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
