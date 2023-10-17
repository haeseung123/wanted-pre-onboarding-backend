import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecruitEntity } from '../entities/recruits.entity';
import { CreateRecruitDto } from '../dto/create-recruit.dto';
import { CompaniesService } from 'src/companies/service/companies.service';
import { UpdateRecruitDto } from '../dto/update-recruit.dto';
import { CreateApplyDto } from 'src/apply/dto/create-apply.dto';
import { ApplyEntity } from 'src/apply/entities/apply.entity';

@Injectable()
export class RecruitsService {
    constructor(
        @InjectRepository(RecruitEntity)
        private readonly recruitRepository: Repository<RecruitEntity>,
        private readonly companiesService: CompaniesService

    ) {}

    async checkRecruit(recruitId: number): Promise<RecruitEntity> {
        const recruit = await this.recruitRepository.findOne({
            where: {
                recruit_id: recruitId
            }
        });
        if(!recruit) {
            throw new NotFoundException(`해당 채용공고(${recruitId})는 존재하지 않습니다.`);
        }
        return recruit;
    }

    async createRecruit(recruitData: CreateRecruitDto): Promise<RecruitEntity> {
        const { company_id, position, reward, description, tech_stack } = recruitData;
        
        const companyExists = await this.companiesService.checkCompany(company_id);
        
        const newRecruit = this.recruitRepository.create({
            position,
            reward,
            description,
            tech_stack: tech_stack,
            company: companyExists
        })

        const savedRecruit = await this.recruitRepository.save(newRecruit);

        try {
            if(!savedRecruit) {
                throw new BadRequestException('채용공고 등록에 실패했습니다.');
            }
            return savedRecruit;
        }
        catch(e) {
            throw new BadRequestException('채용공고 등록중 오류가 발생했습니다.');
        }
    }

    async updateRecruit(recruitId: number, updateData: UpdateRecruitDto): Promise<RecruitEntity> {
        const recruitExists = await this.checkRecruit(recruitId);
        Object.assign(recruitExists, updateData);

        const updatedRecruit = await this.recruitRepository.save(recruitExists);
        
        try {
            if(!updatedRecruit) {
                throw new BadRequestException('채용공고 업데이트에 실패했습니다.');
            }
            return updatedRecruit;
        }
        catch(e) {
            throw new BadRequestException('채용공고 업데이트 중 오류가 발생했습니다.');
        }
    }

    async deleteRecruit(recruitId: number): Promise<{ mesaage: string }> {
        const recruitExists = await this.checkRecruit(recruitId);
        
        try {
            await this.recruitRepository.remove(recruitExists);
            return { mesaage: '채용공고가 삭제되었습니다.'};
        }
        catch(e) {
            throw new BadRequestException('채용공고 삭제 중 오류가 발생했습니다.');
        }
    }

    async getRecruitsWithAliases(queryBuilder) {
        return queryBuilder
            .select([
                'recruit.recruit_id AS 채용공고_id', 
                'company.name AS 회사명', 
                'company.nation AS 국가', 
                'company.location AS 지역', 
                'recruit.position AS 채용포지션', 
                'recruit.reward AS 채용보상금', 
                'recruit.tech_stack AS 사용기술'
            ])
            .leftJoin('recruit.company', 'company')
            .getRawMany();
    }

    async getAllRecruits(): Promise<RecruitEntity[]> {
        return await this.getRecruitsWithAliases(
            this.recruitRepository.createQueryBuilder('recruit')
        );
    }

    async searchRecruitsByKeyword(keyword: string) {
        return await this.getRecruitsWithAliases(
            this.recruitRepository
            .createQueryBuilder('recruit')
            .where(
                'recruit.position LIKE :keyword OR recruit.tech_stack LIKE :keyword OR company.name LIKE :keyword',
                { keyword: `%${keyword}%`}
            )
        );
    }

    async getRecruitDetails(recruitId: number) {
        const recruitDetails = await this.recruitRepository
            .createQueryBuilder('recruit')
            .select([
                'recruit.recruit_id AS 채용공고_id', 
                'company.name AS 회사명', 
                'company.nation AS 국가', 
                'company.location AS 지역', 
                'recruit.position AS 채용포지션', 
                'recruit.reward AS 채용보상금', 
                'recruit.tech_stack AS 사용기술',
                'recruit.description AS 채용내용',
                'recruit.company_id'
            ])
            .where('recruit.recruit_id = :recruitId', { recruitId })
            .leftJoin('recruit.company', 'company')
            .getRawOne();

        if(!recruitDetails) {
            throw new NotFoundException('해당 채용공고는 존재하지 않습니다.');
        }

        const otherRecruits = await this.recruitRepository
            .createQueryBuilder('recruit')
            .select(['recruit.recruit_id'])
            .where('recruit.company_id = :companyId', { companyId: recruitDetails.company_id })
            .andWhere('recruit.recruit_id <> :recruitId', { recruitId })
            .getRawMany();

        const otherRecruitIds = otherRecruits.map((v) => v.recruit_recruit_id);

        if(recruitDetails.company_id) {
            delete recruitDetails.company_id;
        }

        return { ...recruitDetails, "회사가올린다른채용공고": otherRecruitIds};
    }



}
