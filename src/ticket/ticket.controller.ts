import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketPriority } from './enums/ticket-priority.enum';
import { GetTicketsFilterDto } from './dto/get-tickets-filter.dto';
import { Auth } from 'src/user/decorators/auth-decorator';
import { ValidRoles } from 'src/user/interfaces/validRoles';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @Auth(ValidRoles.CLIENT, ValidRoles.ADMIN)
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  // @Get()
  // findAll() {
  //   return this.ticketService.findAll();
  // }

  @Get()
  @Auth(ValidRoles.ADMIN, ValidRoles.AGENT)
  findAllFiltered(@Query() filterDto: GetTicketsFilterDto) {
  return this.ticketService.findAllFiltered(filterDto);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ticketService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.ADMIN, ValidRoles.AGENT)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(id, updateTicketDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.ADMIN)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.ticketService.remove(id);
  }
}
