import { IsEmpty, IsNotEmpty, IsOptional } from 'class-validator';

export class SelfStudyTimeDto {
  @IsNotEmpty()
  grade: number;
  @IsNotEmpty()
  day: number;
  @IsOptional()
  date: Date;
}