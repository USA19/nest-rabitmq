import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.entity';
import { Model } from 'mongoose';
import { CreateProductInput } from './dto/create-product.dto';
import { UpdateProductInput } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productsModel: Model<Product>
  ) { }

  async findAll() {
    return await this.productsModel.find()
  }

  async create(createProductInput: CreateProductInput) {
    try {
      await this.productsModel.create(createProductInput)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(updateProductInput: UpdateProductInput) {
    try {
      const { id } = updateProductInput
      await this.productsModel.findOneAndUpdate({ id }, updateProductInput)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: string) {
    try {
      await this.productsModel.findOneAndDelete({ id })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
