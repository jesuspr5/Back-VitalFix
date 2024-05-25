import { Request } from 'src/requests/entities/request.entity';
import {
    Entity,
    Column,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    Index,
    OneToMany,
    ManyToOne,
} from 'typeorm';

@Entity()
export class Claim {
    @Index()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column()
    title: string;

    @Index()
    @Column({ type: 'date' }) // Especifica el tipo como 'date'
    fecha: Date;

    @Index()
    @Column()
    description: string;

    @Index()
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

    // @OneToMany(() => Request, (request) => request.id)
    // request: Request;

    // @ManyToOne(() => Request, { eager: true })
    // request_id: Request;
    @ManyToOne(() => Request, { eager: true })
    request: Request; // Cambiado a 'request'
}


