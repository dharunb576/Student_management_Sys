import { IsNumber, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { EnrollmentStatus } from '../enrollment.entity';

export class CreateEnrollmentDto {
  @IsNumber()
  studentId: number;

  @IsNumber()
  courseId: number;

  @IsDateString()
  enrollmentDate: string;

  @IsOptional()
  @IsEnum(EnrollmentStatus)
  status: EnrollmentStatus;
}