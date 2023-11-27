import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProductInput {
  @ApiPropertyOptional()
  @Transform(({ value }) => value.toString()?.trim()?.toLowerCase())
  @IsString()
  title: string;

  @ApiProperty()
  @Transform(({ value }) => value.toString()?.trim()?.toLowerCase())
  @IsString()
  image: string;
}
