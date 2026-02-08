import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TicketPriority } from "../enums/ticket-priority.enum";
import { TicketStatus } from "../enums/ticket-status.enum";
import { TicketComentario } from "./ticket-cometario.entity";
import { User } from "src/user/entities/user.entity";


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

    @ManyToOne(
        () => User,
        (user) => user.tickets,
        { eager: true }
    )
    user: User;
    
    @OneToMany(
        () => TicketComentario,
        (comentario) => comentario.ticket,
        { cascade: true }
    )
    comentarios?: TicketComentario[];
    
    @BeforeInsert()
    setCreatedAt() {
        this.createdAt = new Date();
        this.updatedAt = null;
    }
}
