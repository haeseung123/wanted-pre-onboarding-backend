import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplyEntity } from '../entities/apply.entity';
import { CreateApplyDto } from '../dto/create-apply.dto';
import { RecruitsService } from 'src/recruits/service/recruits.service';
import { UsersService } from 'src/users/service/users.service';

@Injectable()
export class ApplyService {
    constructor(
        @InjectRepository(ApplyEntity)
        private readonly applyRepository: Repository<ApplyEntity>,
        private readonly recruitsService: RecruitsService,
        private readonly usersServcie: UsersService
    ) {}

    async applyRecruit(applyData: CreateApplyDto): Promise<ApplyEntity> {
        const { recruit_id, user_id } = applyData;
        const recruitExists = await this.recruitsService.checkRecruit(recruit_id);

        const userExists = await this.usersServcie.checkUser(user_id);
        
        if(userExists.status !== 0) {
            throw new BadRequestException('이미 지원이 완료된 유저입니다.')
        }
        userExists.status = 1;
        const updateStatus = this.usersServcie.updateUserStatus(userExists);
        console.log(updateStatus)

        const newApply = this.applyRepository.create({
            recruit: recruitExists,
            user: userExists
        })

        const savedApply = await this.applyRepository.save(newApply)

        try {
            if(!savedApply) {
                throw new BadRequestException('지원에 실패했습니다.')
            }
            return savedApply
        }
        catch(e) {
            throw new BadRequestException('지원중 오류가 발생했습니다.')
        }

    }

}
