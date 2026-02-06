import { IsString, MaxLength, MinLength } from "class-validator";
import { TicketPriority } from "../enums/ticket-priority.enum";
import { TicketStatus } from "../enums/ticket-status.enum";

export class CreateTicketDto {
    @IsString()
    @MaxLength(100)
    @MinLength(5)
    title: string;
    
    @IsString()
    @MinLength(5)
    description: string;
    
    @IsString()
    @MinLength(4)
    priority: TicketPriority;

    @IsString()
    @MinLength(5)
    status: TicketStatus;

}
