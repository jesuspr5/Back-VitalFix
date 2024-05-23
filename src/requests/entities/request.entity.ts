import { Typeservice } from 'src/typeservice/entities/typeservice.entity';
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

@Entity()
export class Request {
    @Index()
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column()
    details: string;


    @Column()
    maker: string;


    @Column()
    model: string;


    @Column()
    serial: string;


    @Column({ nullable: true })
    description?: string;

    @Column({ nullable: true })
    urlAvatar: string;



    @Column()
    name: string;


    @Column()
    lastname: string;


    @Column()
    email: string;


    @Column()
    phone: string;


    @Column()
    address: string;


    @Column()
    reference: string;


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
