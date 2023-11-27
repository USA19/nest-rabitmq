import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  _id: string;

  @Prop()
  title: string;

  @Prop()
  image: string;

  @Prop()
  likes: number;

  @Prop({ index: true })
  id: string;

  createdAt: Date;

  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
