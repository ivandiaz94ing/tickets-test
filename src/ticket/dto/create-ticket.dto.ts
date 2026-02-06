import { IsString, MaxLength, MinLength } from "class-validator";

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
    priority: string;

    @IsString()
    @MinLength(5)
    status: string;

}
