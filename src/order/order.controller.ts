import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './order.entity';
import { User } from 'src/user/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/user/get-user.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @GetUser() user: User): Promise<Order> {
    return this.orderService.create(createOrderDto, user);
  }

  @Get()
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.orderService.remove(id);
  }

  @Get('history')
  async getOrderHistory(@GetUser() user: User) {
    return this.orderService.findAllByUser(user.id);
  }
}