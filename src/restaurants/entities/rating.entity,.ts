import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  rating_id: string;

  @Column()
  score: number; // Por ejemplo, la puntuación del restaurante

  // Relación muchos a uno con User
  @ManyToOne(() => User, (user) => user.ratings)
  user: User;

  // Relación muchos a uno con Restaurant
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.ratings)
  restaurant: Restaurant;
}
