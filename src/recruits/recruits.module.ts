import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecruitsService } from './recruits.service';
import { RecruitsController } from './recruits.controller';
import { RecruitEntity } from './entities/recruits.entity';
import { CompaniesService } from 'src/companies/companies.service';
import { CompaniesModule } from 'src/companies/companies.module';
import { CompanyEntity } from 'src/companies/entities/companies.entity';

@Module({
    providers: [RecruitsService, CompaniesService],
    controllers: [RecruitsController],
    imports: [TypeOrmModule.forFeature([RecruitEntity, CompanyEntity]), CompaniesModule],
})
export class RecruitsModule {}
