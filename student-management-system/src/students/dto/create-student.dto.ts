import { IsString, IsEmail, IsDateString, IsOptional, IsBoolean } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsDateString()
  dateOfBirth: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}