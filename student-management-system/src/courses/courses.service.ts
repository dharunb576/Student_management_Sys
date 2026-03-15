import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) throw new NotFoundException(`Course #${id} not found`);
    return course;
  }

  async create(data: Partial<Course>): Promise<Course> {
    const course = this.courseRepository.create(data);
    return this.courseRepository.save(course);
  }

  async update(id: number, data: Partial<Course>): Promise<Course> {
    await this.findOne(id);
    await this.courseRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.courseRepository.delete(id);
    return { message: `Course #${id} deleted successfully` };
  }
}