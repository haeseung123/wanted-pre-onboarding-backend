import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecruitsService } from '../service/recruits.service';
import { RecruitsController } from '../controller/recruits.controller';
import { RecruitEntity } from '../entities/recruits.entity';
import { CompaniesService } from 'src/companies/service/companies.service';
import { CompaniesModule } from 'src/companies/module/companies.module';
import { CompanyEntity } from 'src/companies/entities/companies.entity';
import { ApplyModule } from 'src/apply/module/apply.module';
import { ApplyEntity } from 'src/apply/entities/apply.entity';

@Module({
    providers: [RecruitsService, CompaniesService],
    controllers: [RecruitsController],
    imports: [TypeOrmModule.forFeature([RecruitEntity, CompanyEntity, ApplyEntity]),
    forwardRef(() => CompaniesModule),
    forwardRef(() => ApplyModule)],
    exports: [RecruitsService, TypeOrmModule.forFeature([RecruitEntity])]
})
export class RecruitsModule {}
