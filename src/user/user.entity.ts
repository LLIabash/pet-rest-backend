import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Order } from 'src/order/order.entity';
import { Product } from 'src/product/product.entity';
import { Review } from 'src/review/review.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  @ManyToMany(() => Product)
  @JoinTable()
  wishlist: Product[];

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];
}