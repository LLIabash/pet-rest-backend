import { Category } from 'src/category/category.entity';
import { Review } from 'src/review/review.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @ManyToMany(() => Category, category => category.products)
  categories: Category[];

  @OneToMany(() => Review, review => review.product)
  reviews: Review[];

  @Column({ type: 'float', default: 0 })
  averageRating: number;
}