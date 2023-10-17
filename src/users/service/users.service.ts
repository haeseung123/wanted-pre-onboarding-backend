import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/users.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async checkUser(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                user_id: userId
            }
        });
        if(!user) {
            throw new NotFoundException('존재하지 않는 유저입니다.');
        }
        return user;
    }

    async createUser(userData: CreateUserDto): Promise<UserEntity> {
        const newUser = this.userRepository.create(userData);
        const savedUser = await this.userRepository.save(newUser);
        
        if(!savedUser) {
            throw new BadRequestException('유저 등록에 실패했습니다.')
        }
        return savedUser
    }

    async updateUserStatus(userStatus: UserEntity): Promise<UserEntity> {
        return await this.userRepository.save(userStatus)
    }

    

}
