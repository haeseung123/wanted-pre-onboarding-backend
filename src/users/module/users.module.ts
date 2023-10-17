import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../service/users.service';
import { UsersController } from '../controller/users.controller';
import { UserEntity } from '../entities/users.entity';

@Module({
    providers: [UsersService],
    controllers: [UsersController],
    imports: [TypeOrmModule.forFeature([UserEntity])],
    exports: [UsersService]
})
export class UsersModule {}
