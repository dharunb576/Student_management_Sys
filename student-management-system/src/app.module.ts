import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentModule } from './enrollment/enrollment.module';

@Module({
  imports: [
    // Step 1 — Load .env file globally across the entire app
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Step 2 — Connect to PostgreSQL using .env values
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host:     config.get<string>('DB_HOST'),
        port:     config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),

        entities: [__dirname + '/**/*.entity{.ts,.js}'],

        synchronize: true, // ⚠️ only for development, turn off in production
      }),
    }),

    AuthModule,

    StudentsModule,

    CoursesModule,

    EnrollmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}