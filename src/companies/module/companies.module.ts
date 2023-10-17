import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesService } from '../service/companies.service';
import { CompaniesController } from '../controller/companies.controller';
import { CompanyEntity } from '../entities/companies.entity';
import { RecruitsModule } from 'src/recruits/module/recruits.module';

@Module({
  providers: [CompaniesService],
  controllers: [CompaniesController],
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  exports: [CompaniesService]
})
export class CompaniesModule {}
