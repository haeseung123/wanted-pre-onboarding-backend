import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplyService } from '../service/apply.service';
import { ApplyController } from '../controller/apply.controller';
import { ApplyEntity } from '../entities/apply.entity';
import { UsersService } from 'src/users/service/users.service';
import { UsersModule } from 'src/users/module/users.module';
import { UserEntity } from 'src/users/entities/users.entity';
import { RecruitsService } from 'src/recruits/service/recruits.service';
import { RecruitsModule } from 'src/recruits/module/recruits.module';
import { RecruitEntity } from 'src/recruits/entities/recruits.entity';
import { CompaniesService } from 'src/companies/service/companies.service';
import { CompaniesModule } from 'src/companies/module/companies.module';

@Module({
    providers: [ApplyService, UsersService, RecruitsService],
    controllers: [ApplyController],
    imports: [TypeOrmModule.forFeature([ApplyEntity, UserEntity, RecruitEntity]), 
    forwardRef(() => UsersModule),
    forwardRef(() => CompaniesModule)]
})
export class ApplyModule {}
