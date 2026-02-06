import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Filter, Repository } from 'typeorm';
import { TicketPriority } from './enums/ticket-priority.enum';
import { GetTicketsFilterDto } from './dto/get-tickets-filter.dto';

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

  // findAll() {
  //   const tickets = this.ticketRepository.find();
  //   return tickets;
  // }
  
  // async findAllFiltered(priority?: TicketPriority) {
  //   if (priority) {
  //     return await this.ticketRepository.find({
  //       where: priority ? { priority } :{},
  //       order: { createdAt: 'DESC' }
  //     });
  //   }
  // }

  async findAllFiltered(filterDto: GetTicketsFilterDto) {
  // Creamos el objeto de opciones
  const {status, priority} = filterDto;
  const whereOptions: any = {};

  if(status) whereOptions.status = status;
  if(priority) whereOptions.priority = priority;

  return await this.ticketRepository.find({
    where: whereOptions,
    order: { createdAt: 'DESC' }
  });
  }

  async findOne(id: string) {
    const ticket = await this.ticketRepository.findOneBy({ id });
    if (!ticket) {
      throw new NotFoundException(`Ticket with id ${id} not found`);
    }
    return ticket;
  }



  async update(id: string, updateTicketDto: UpdateTicketDto) {
  // 1. Buscamos el ticket. Si no existe, findOne lanzará el error 404 que ya programaste.
    const ticket = await this.findOne(id);
  // 2. fusionamos los datos del DTO con el ticket encontrado
     this.ticketRepository.merge(ticket, updateTicketDto); 
  // 3. guardamos el ticket actualizado en la base de datos
      await this.ticketRepository.save(ticket);
    return ticket;
  }

  async remove(id: string) {
    const ticket = await this.findOne(id);
    
    await this.ticketRepository.delete(id);

    }
}
