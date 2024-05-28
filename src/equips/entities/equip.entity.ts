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
} from 'typeorm';

@Entity()

export class Equip {


    @Index()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column({ nullable: true })
    name: string;


    @Index()
    @Column({ nullable: true })
    description?: string;


    @Column({ nullable: true })
    urlImagen?: string | null;

    @Index()
    @Column({ nullable: true, default: true })
    status: boolean;

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

    @OneToMany(() => Request, (request) => request.equip)
    request: Request[];

}
