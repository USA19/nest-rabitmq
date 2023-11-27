import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';
import { CreateProductInput } from './dto/create-product.dto';
import { UpdateProductInput } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService
  ) { }

  @Get()
  async all() {
    return await this.productService.findAll()
  }

  @EventPattern("Product_Created")
  async create(createProductInput: CreateProductInput) {
    try {
      await this.productService.create(createProductInput)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  @EventPattern("Product_Updated")
  async update(updateProductInput: UpdateProductInput) {
    try {
      await this.productService.update(updateProductInput)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  @EventPattern("Product_Deleted")
  async remove(id: string) {
    try {
      await this.productService.remove(id)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
