import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from 'src/user/user.entity';
import { Product } from 'src/product/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,  // Добавлен репозиторий для работы с продуктами
  ) { }

  async create(createOrderDto: CreateOrderDto, user: User): Promise<Order> {
    const products = await this.productRepository.findByIds(createOrderDto.products);

    // Убедитесь, что все продукты найдены
    if (products.length !== createOrderDto.products.length) {
      throw new NotFoundException('One or more products not found');
    }

    const order = this.orderRepository.create({
      ...createOrderDto,
      products,  // Используем объекты продуктов
      user,
    });
    return await this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({ relations: ['user', 'products'] });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'products'],
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);

    if (updateOrderDto.products) {
      const products = await this.productRepository.findByIds(updateOrderDto.products);

      // Убедитесь, что все продукты найдены
      if (products.length !== updateOrderDto.products.length) {
        throw new NotFoundException('One or more products not found');
      }

      order.products = products;
    }

    Object.assign(order, updateOrderDto);
    return await this.orderRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }

  async findAllByUser(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'products'],
    });
  }
}