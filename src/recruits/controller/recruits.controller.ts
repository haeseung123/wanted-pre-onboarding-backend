import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { RecruitsService } from '../service/recruits.service';
import { CreateRecruitDto } from '../dto/create-recruit.dto';
import { UpdateRecruitDto } from '../dto/update-recruit.dto';
import { RecruitEntity } from '../entities/recruits.entity';


@Controller('recruits')
export class RecruitsController {
    constructor(
        private readonly recruitsService: RecruitsService
    ) {}

    @Get()
    async getAllRecruits(): Promise<RecruitEntity[]> {
        return this.recruitsService.getAllRecruits();
    }

    @Get('search')
    async searchRecruits(@Query('keyword') keyword: string): Promise<RecruitEntity[]> {
        return this.recruitsService.searchRecruitsByKeyword(keyword);
    }

    @Get('/:id')
    async getRecruitDetails(@Param('id') recruitId: number) {
        return this.recruitsService.getRecruitDetails(recruitId)
    }

    @Post()
    async createRecruit(@Body() recruitData: CreateRecruitDto) {
        return await this.recruitsService.createRecruit(recruitData);
    }

    @Put('/:id')
    async updateRecruit(@Param('id') recruitId: number, @Body() updateData: UpdateRecruitDto) {
        return await this.recruitsService.updateRecruit(recruitId, updateData);
    }

    @Delete('/:id')
    async deleteRecruit(@Param('id') recruitId: number) {
        return await this.recruitsService.deleteRecruit(recruitId);
    }
}
