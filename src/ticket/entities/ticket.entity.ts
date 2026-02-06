import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TicketPriority } from "../enums/ticket-priority.enum";
import { TicketStatus } from "../enums/ticket-status.enum";


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
    
    @Column(
        {
            type: 'enum',
            enum: TicketPriority,
            default: TicketPriority.BAJA
        }
    )
    priority: TicketPriority;
    
    @Column('text', {
        nullable: true,
    })
    categoria: string;
    
    @Column({
        type: 'enum',
        enum: TicketStatus,
        default: TicketStatus.ABIERTO
    })
    status: TicketStatus;
    
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
