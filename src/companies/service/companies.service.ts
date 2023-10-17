import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from '../entities/companies.entity';
import { CreateCompanyDto } from '../dto/create-company.dto';


@Injectable()
export class CompaniesService {
    constructor(
        @InjectRepository(CompanyEntity)
        private readonly companyRepository: Repository<CompanyEntity>
    ) {}

    async checkCompany(companyId: number): Promise<CompanyEntity> {
        const company = await this.companyRepository.findOne({
            where: {
                company_id: companyId
            }
        });
        if(!company) {
            throw new NotFoundException(`해당 회사(${companyId})는 존재하지 않습니다.`);
        }

        return company;
    }

    async createCompany(companyData: CreateCompanyDto): Promise<CompanyEntity> {
        const newCompany = this.companyRepository.create(companyData);
        const savedCompany = await this.companyRepository.save(newCompany);
        try {
            if(!savedCompany) {
                throw new BadRequestException('회사 등록에 실패했습니다.');
            }
            return savedCompany; 
        }
        catch(e) {
            throw new BadRequestException('회사 등록중 오류가 발생했습니다.');
        }

    }

    

    getHello() {
        return 'hello'
    }
}
