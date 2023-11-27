import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductInput } from './dto/create-product.dto';
import { UpdateProductInput } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService
  ) { }

  @Get()
  async all(): Promise<Product[]> {
    return await this.productService.findAllProducts()
  }

  @Get("/:id")
  async getProductById(@Param("id") id: string,): Promise<Product> {
    return await this.productService.getProductById(id)
  }

  @Post()
  async create(@Body() createProductInput: CreateProductInput): Promise<Product> {
    return await this.productService.create(createProductInput)
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() updateProductInput: UpdateProductInput): Promise<Product> {
    return await this.productService.update(id, updateProductInput)
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    return await this.productService.delete(id)
  }
}
