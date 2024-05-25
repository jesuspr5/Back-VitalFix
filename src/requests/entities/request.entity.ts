import { Claim } from 'src/claims/entities/claim.entity';
import { Service } from 'src/services/entities/service.entity';
import { User } from 'src/users/entities/user.entity';
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


    // @ManyToOne(() => Typeservice, { eager: true }) // eager para cargar automáticamente el tipo
    // @JoinColumn() // esto asegura que 'type' se refiera a 'name' de Typeservice
    // type: Typeservice;


    @ManyToOne(() => Service, { eager: true })
    service: Service;

    @ManyToOne(() => User, { eager: true })
    user: User;


    @OneToMany(() => Claim, (claims) => claims.request)
    claims: Claim[];
    // @ManyToOne(() => User, user => user.requests)
    // user: User;
}
