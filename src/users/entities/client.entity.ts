import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Request } from 'src/requests/entities/request.entity';

@Entity()
export class Client {
    @PrimaryGeneratedColumn('uuid')
    client_id: string;

    // @ManyToOne(() => User, user => user.clients)
    // user: User;

    // @OneToMany(() => Request, request => request.client)
    // requests: Request[];
}