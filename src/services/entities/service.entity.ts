import {
    Entity,
    Column,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    Index,
} from 'typeorm';

@Entity()
export class Service {
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

}

