import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


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
    
    @Column('text',
        {
            default: 'Media'
        }
    )
    priority: string;
    
    @Column('text', {
        nullable: true,
    })
    categoria: string;
    
    @Column('text',{
        default: 'Abierto'
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
        type: 'timestamp',
        nullable: true,
        default: null,
    })
    updatedAt: Date | null;
    
    @BeforeInsert()
    setCreatedAt() {
        this.createdAt = new Date();
        this.updatedAt = null;
    }
}
