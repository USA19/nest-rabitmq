import { IsNumber } from 'class-validator';
export class UpdateProductInput {
  id: string
  likes?: number;
  title?: string;
  image?: string;
}
