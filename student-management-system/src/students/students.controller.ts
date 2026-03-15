import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Students')
@ApiBearerAuth()
@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all students' })
  @ApiResponse({ status: 200, description: 'Returns all students' })
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get student by ID' })
  @ApiResponse({ status: 200, description: 'Returns a student' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Post()
  @Roles('admin', 'teacher')
  @ApiOperation({ summary: 'Create a new student' })
  @ApiResponse({ status: 201, description: 'Student created successfully' })
  create(@Body() dto: CreateStudentDto) {
    return this.studentsService.create(dto);
  }

  @Put(':id')
  @Roles('admin', 'teacher')
  @ApiOperation({ summary: 'Update a student' })
  @ApiResponse({ status: 200, description: 'Student updated successfully' })
  update(@Param('id') id: string, @Body() dto: CreateStudentDto) {
    return this.studentsService.update(+id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a student' })
  @ApiResponse({ status: 200, description: 'Student deleted successfully' })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}