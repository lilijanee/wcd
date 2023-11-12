import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column({unique: true})
    tel: string;

    @Column()
    password: string;
}