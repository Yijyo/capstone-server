import { Query } from '../query/query.entity';
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique : true})
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Query, query => query.user)
    queries: Query[];
}