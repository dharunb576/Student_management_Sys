import { IsString, IsNumber, IsOptional, IsBoolean, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCourseDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  duration: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  fee: number;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}