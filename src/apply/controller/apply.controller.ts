import { Body, Controller, Post } from '@nestjs/common';
import { ApplyService } from '../service/apply.service';
import { CreateApplyDto } from '../dto/create-apply.dto';

@Controller('apply')
export class ApplyController {
    constructor(
        private readonly applyService: ApplyService
    ) {}

    @Post()
    async applyRecruit(@Body() applyData: CreateApplyDto) {
        return this.applyService.applyRecruit(applyData)
    }
}
