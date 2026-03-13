import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { EnrollmentStatus } from './enrollment.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Enrollment')
@ApiBearerAuth()
@Controller('enrollment')
@UseGuards(JwtAuthGuard)
export class EnrollmentController {
  constructor(private enrollmentService: EnrollmentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all enrollments' })
  @ApiResponse({ status: 200, description: 'Returns all enrollments' })
  findAll() {
    return this.enrollmentService.findAll();
  }

  @Get('student/:studentId')
  @ApiOperation({ summary: 'Get all enrollments for a student' })
  findByStudent(@Param('studentId') studentId: string) {
    return this.enrollmentService.findByStudent(+studentId);
  }

  @Get('course/:courseId')
  @ApiOperation({ summary: 'Get all enrollments for a course' })
  findByCourse(@Param('courseId') courseId: string) {
    return this.enrollmentService.findByCourse(+courseId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get enrollment by ID' })
  @ApiResponse({ status: 404, description: 'Enrollment not found' })
  findOne(@Param('id') id: string) {
    return this.enrollmentService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Enroll a student in a course' })
  @ApiResponse({ status: 409, description: 'Student already enrolled' })
  enroll(@Body() dto: CreateEnrollmentDto) {
    return this.enrollmentService.enroll(dto.studentId, dto.courseId, dto.enrollmentDate);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update enrollment status' })
  updateStatus(@Param('id') id: string, @Body('status') status: EnrollmentStatus) {
    return this.enrollmentService.updateStatus(+id, status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an enrollment' })
  remove(@Param('id') id: string) {
    return this.enrollmentService.remove(+id);
  }
}