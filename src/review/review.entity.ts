import { IsInt, Min, Max, IsDefined } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Product } from 'src/product/product.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.reviews)
  user: User;

  @ManyToOne(() => Product, product => product.reviews)
  @IsDefined()
  product: Product;

  @Column()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @Column()
  comment: string;

  @Column({ nullable: true })
  appendedComment: string;
}