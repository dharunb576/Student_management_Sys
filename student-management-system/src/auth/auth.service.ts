import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(name: string, email: string, password: string, role?: string) {
    // Check if user already exists
    const existing = await this.userRepository.findOne({ where: { email } });
    if (existing) throw new ConflictException('Email already registered');

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Save user
    const user = this.userRepository.create({
      name,
      email,
      password: hashed,
      role: role as any,
    });
    await this.userRepository.save(user);

    return { message: 'User registered successfully' };
  }

  async login(email: string, password: string) {
    // Find user
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    // Generate JWT token
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async updateProfile(userId: number, name: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    user.name = name;
    await this.userRepository.save(user);
    return { message: 'Profile updated successfully', user: { id: user.id, name: user.name, email: user.email, role: user.role } };
  }

  async changePassword(userId: number, currentPassword: string, newPassword: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new UnauthorizedException('Current password is incorrect');
    user.password = await bcrypt.hash(newPassword, 10);
    await this.userRepository.save(user);
    return { message: 'Password changed successfully' };
  }
}