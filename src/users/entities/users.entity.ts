import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class UserEntity{
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    id: string;

    @Column()
    password: string;

    @Column( { default: 0 })
    status: number;
}