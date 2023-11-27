import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'Products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  image: string;

  @Column({ nullable: true, default: 0 })
  @ApiProperty()
  likes: number;

  @CreateDateColumn({ type: 'timestamptz' })
  @ApiProperty()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @ApiProperty()
  updatedAt: string;
}
