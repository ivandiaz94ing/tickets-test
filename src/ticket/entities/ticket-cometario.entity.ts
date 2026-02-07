import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from "./ticket.entity";

    @Entity()
    export class TicketComentario {
        @PrimaryGeneratedColumn('uuid')
        ticketId: string;
        
        @Column('text')
        comentario: string;
        
        @Column({
            type: 'timestamp with time zone',
        })
        createdAt: Date;

        @ManyToOne(
            () => Ticket,
            (ticket) => ticket.comentarios
        )
        ticket: Ticket;
    }