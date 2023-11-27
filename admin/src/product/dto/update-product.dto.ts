import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateProductInput } from './create-product.dto';

export class UpdateProductInput extends PartialType(CreateProductInput) {
  @ApiPropertyOptional()
  @IsNumber()
  likes: number;
}
