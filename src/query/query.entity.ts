import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Query {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => User, user => user.queries)
    user: User;
    
    @Column()
    userEmail : string;
    
    @Column('text')
    requestMessage: string;

    @Column('text')
    responseMessage: string;

    @CreateDateColumn()
    createdAt: Date;
}