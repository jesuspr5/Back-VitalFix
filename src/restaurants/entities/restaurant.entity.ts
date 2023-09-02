import { Gallery } from '../../gallery/entities/gallery.entity';
import { Entity, Column, DeleteDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Restaurant {
  @Column({ primary: true, generated: true })
  id: number;

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

  @OneToMany(() => Gallery, (gallery) => gallery.id, {
    eager: true,
  })
  gallery: Gallery[];
}
