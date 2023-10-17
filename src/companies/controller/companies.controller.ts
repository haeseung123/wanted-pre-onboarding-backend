import { Body, Controller, Get, Post } from '@nestjs/common';
import { CompaniesService } from '../service/companies.service';
import { CompanyEntity } from '../entities/companies.entity';
import { CreateCompanyDto } from '../dto/create-company.dto';


@Controller('companies')
export class CompaniesController {
    constructor(
        private readonly companiesService: CompaniesService
    ) {}

    @Post()
    async createCompany(@Body() companyData: CreateCompanyDto) {
        return this.companiesService.createCompany(companyData)
    }

    @Get()
    getHello() {
        return this.getHello
    }
}
