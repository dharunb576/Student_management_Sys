import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment, EnrollmentStatus } from './enrollment.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
  ) {}

  async findAll(): Promise<Enrollment[]> {
    return this.enrollmentRepository.find();
  }

  async findOne(id: number): Promise<Enrollment> {
    const enrollment = await this.enrollmentRepository.findOne({ where: { id } });
    if (!enrollment) throw new NotFoundException(`Enrollment #${id} not found`);
    return enrollment;
  }

  async findByStudent(studentId: number): Promise<Enrollment[]> {
    return this.enrollmentRepository.find({ where: { studentId } });
  }

  async findByCourse(courseId: number): Promise<Enrollment[]> {
    return this.enrollmentRepository.find({ where: { courseId } });
  }

  async enroll(studentId: number, courseId: number, enrollmentDate: string): Promise<Enrollment> {
    // Check if already enrolled
    const existing = await this.enrollmentRepository.findOne({
      where: { studentId, courseId },
    });
    if (existing) throw new ConflictException('Student already enrolled in this course');

    const enrollment = this.enrollmentRepository.create({
      studentId,
      courseId,
      enrollmentDate,
      status: EnrollmentStatus.ACTIVE,
    });
    return this.enrollmentRepository.save(enrollment);
  }

  async updateStatus(id: number, status: EnrollmentStatus): Promise<Enrollment> {
    await this.findOne(id);
    await this.enrollmentRepository.update(id, { status });
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.enrollmentRepository.delete(id);
    return { message: `Enrollment #${id} removed successfully` };
  }
}