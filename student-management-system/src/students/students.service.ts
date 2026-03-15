import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) throw new NotFoundException(`Student #${id} not found`);
    return student;
  }

  async create(data: Partial<Student>): Promise<Student> {
    const student = this.studentRepository.create(data);
    return this.studentRepository.save(student);
  }

  async update(id: number, data: Partial<Student>): Promise<Student> {
    await this.findOne(id); // check exists
    await this.studentRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id); // check exists
    await this.studentRepository.delete(id);
    return { message: `Student #${id} deleted successfully` };
  }
}