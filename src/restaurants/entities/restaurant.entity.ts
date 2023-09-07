import {
  Entity,
  Column,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { RestaurantImage } from './restaurant-images.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  direction: string;
  @Column()
  phone: string;
  @Column()
  email: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  geolocation?: string;

  @DeleteDateColumn()
  deletedAt: Date;
  // images
  @OneToMany(() => RestaurantImage, (image) => image.restaurant, {
    cascade: true,
    eager: true,
  })
  images?: RestaurantImage[];
}
