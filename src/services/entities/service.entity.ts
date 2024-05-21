import {
    Entity,
    Column,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    Index,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Typeservice } from 'src/typeservice/entities/typeservice.entity';


@Entity()
export class Service {
    @Index()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;


    @Column()
    price: number;

    @Column()
    description: string;

    @Column()
    status: string;

    @DeleteDateColumn({ select: false })
    deletedAt: Date;

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


    @ManyToOne(() => Typeservice, { eager: true }) // eager para cargar automáticamente el tipo
    @JoinColumn() // esto asegura que 'type' se refiera a 'name' de Typeservice
    type: Typeservice;

}

