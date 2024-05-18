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
    name: string;

    @Column()
    tipo: string;

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

}

