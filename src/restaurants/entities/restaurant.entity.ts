import {
  Entity,
  Column,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { RestaurantImage } from './restaurant-images.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { User } from '../../users/entities/user.entity';
import { Rating } from './rating.entity,';

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

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
  // images
  @OneToMany(() => RestaurantImage, (image) => image.restaurant, {
    cascade: true,
    eager: true,
  })
  images?: RestaurantImage[];

  // Relación uno a muchos con Comentary
  @OneToMany(() => Comment, (comentary) => comentary.restaurant)
  comments: Comment[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
  // Relación muchos a uno con User
  @ManyToOne(() => User, (user) => user.restaurants)
  creator: User;

  // Relación uno a muchos con Rating
  @OneToMany(() => Rating, (rating) => rating.restaurant)
  ratings: Rating[];

  // Relación muchos a muchos con User para los usuarios que han marcado el restaurante como favorito
  @ManyToMany(() => User, (user) => user.favoriteRestaurants)
  favoriteUsers: User[];
}
