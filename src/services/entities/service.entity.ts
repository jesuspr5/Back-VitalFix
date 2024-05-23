import {
    Entity,
    Column,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    Index,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm';
import { Typeservice } from 'src/typeservice/entities/typeservice.entity';
import { Request } from 'src/requests/entities/request.entity';


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
    @JoinColumn()
    type: Typeservice;

    @OneToMany(() => Request, (request) => request.service)
    request: Request[];


}

