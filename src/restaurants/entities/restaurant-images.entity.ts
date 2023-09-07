import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity()
export class RestaurantImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;
  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.images)
  restaurant: Restaurant;
}
