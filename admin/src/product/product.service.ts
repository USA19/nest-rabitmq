import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.dto';
import { UpdateProductInput } from './dto/update-product.dto';
import { ResponsePayloadResponse } from './dto/delet-product.payload';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @Inject("PRODUCTS_SERVICE")
    private readonly clientProxy: ClientProxy
  ) {
    this.clientProxy.connect();
  }

  async findById(id: string): Promise<Product> {
    return await this.productsRepository.findOne({ where: { id } })
  }

  async findAllProducts(): Promise<Product[]> {
    return await this.productsRepository.find()
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const product = await this.findById(id);

      if (!product) {
        throw new NotFoundException("Product Not Found.")
      }

      return product
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  };

  async create(createProductInput: CreateProductInput) {
    try {
      const productInstance = this.productsRepository.create(createProductInput)
      const product = await this.productsRepository.save(productInstance);
      this.clientProxy.emit("Product_Created", product)
      return product
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, updateProductInput: UpdateProductInput): Promise<Product> {
    try {
      const product = await this.findById(id)

      if (!product) {
        throw new NotFoundException("Product Not Found.")
      }

      this.clientProxy.emit("Product_Updated", { ...updateProductInput, id })

      return await this.productsRepository.save({ ...product, ...updateProductInput })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async delete(id: string): Promise<ResponsePayloadResponse> {
    try {
      const product = await this.findById(id)

      if (!product) {
        throw new NotFoundException("Product Not Found.")
      }

      await this.productsRepository.delete(id);

      this.clientProxy.emit("Product_Deleted", id)
      return {
        response: { status: 200, message: 'Product deleted successfully' },
      };

    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
