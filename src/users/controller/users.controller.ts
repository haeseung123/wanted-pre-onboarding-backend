import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersServicce: UsersService
    ) {}

    @Post()
    async createUser(@Body() userData: CreateUserDto) {
        return this.usersServicce.createUser(userData);
    }
}
