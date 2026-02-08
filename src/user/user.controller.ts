import { Controller, Get, Post, Body, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user-decorator';
import { User } from './entities/user.entity';
import { GetRowHeaders } from './decorators/get-rowHeader-decorator';
import { UserRoleGuard } from './guards/user-role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @GetRowHeaders() rowHeaders: string[]
  ){
    return{
      ok: true,
      message: 'This is a private route',
      user,
      userEmail,
      rowHeaders
      
    }

  }
  // @SetMetadata('roles', ['admin', 'agent'])

  @Get('private2')
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(
    @GetUser() user: User,
  ){
    return{
      ok: true,
      message: 'This is a private route 2',
      user,
    }

  }
}
