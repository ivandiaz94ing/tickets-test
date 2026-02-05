import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('tickets')
export class Ticket {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    title: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    description: string;
    
    @Column('text')
    priority: string;
    
    @Column('text')
    categoria: string;
    
    @Column('text',{
        default: 'Open'
    })
    status: string;
    
    @Column('text', {
        nullable: true
    })
    userAsigned?: string;

    @Column({
        type: 'timestamp with time zone',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz'
    })
    updatedAt?: Date;
}
