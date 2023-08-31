import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()

export class Comment {
@Column( {primary:true, generated:true})
id:number;

@Column()
description:string

@DeleteDateColumn()
deletedAt: Date;
}
