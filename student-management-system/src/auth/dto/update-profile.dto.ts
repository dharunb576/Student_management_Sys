import { IsString, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @MinLength(1, { message: 'Name cannot be empty' })
  name: string;
}
