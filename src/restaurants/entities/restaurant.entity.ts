import { Entity,Column ,DeleteDateColumn} from "typeorm";

@Entity()
export class Restaurant {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    name:string 

    @Column()
    direction:string    
    @Column()
    phone:string
    @Column()
    email:string
    @Column({nullable:true})
    description?:string
    @Column({nullable:true})
    geolocation?:string
    
    @DeleteDateColumn()
  deletedAt: Date;


}
