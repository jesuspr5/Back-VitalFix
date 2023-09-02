import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Gallery {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  firebasePath: string;

  @ManyToOne(() => Restaurant, (rest) => rest)
  Restaurants: Restaurant;
}
