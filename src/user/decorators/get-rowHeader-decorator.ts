import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const GetRowHeaders = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {

            const req = ctx.switchToHttp().getRequest();

            const rowHeaders = req.rawHeaders;
            
            console.log(rowHeaders);

            if (!rowHeaders)
                throw new InternalServerErrorException('Row headers not found (request)');
            return rowHeaders;
    });