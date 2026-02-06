import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketService {

  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>
  ) {
    
  }
  async create(createTicketDto: CreateTicketDto) {

    try {
      
      const ticket = this.ticketRepository.create(createTicketDto);
      await this.ticketRepository.save(ticket);
      return ticket;
      
    } catch (error) {
      console.log(error);
      
    }
  }

  findAll() {
    const tickets = this.ticketRepository.find();
    return tickets;
  }

  async findOne(id: string) {
    const ticket = await this.ticketRepository.findOneBy({ id });
    if (!ticket) {
      throw new NotFoundException(`Ticket with id ${id} not found`);
    }
    return ticket;
  }

  update(id: string, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  async remove(id: string) {
    const ticket = await this.findOne(id);
    
    await this.ticketRepository.delete(id);

    }
}
