
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
export class Promotion {
    @Index()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column()
    titulo: string;



    @Index()
    @Column({ nullable: true })
    description?: string;

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
