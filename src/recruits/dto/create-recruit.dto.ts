import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateRecruitDto{
    @IsNumber()
    @IsNotEmpty({ message: '회사 ID를 입력해주세요.'})
    company_id: number;

    @IsString()
    @IsNotEmpty({ message: '채용포지션을 입력해주세요.'})
    position: string;

    @IsNumber()
    @IsNotEmpty({ message: '채용보상금을 입력해주세요.'})
    reward: number;

    @IsString()
    @IsNotEmpty({ message: '채용내용을 입력해주세요.'})
    description: string;

    @IsString()
    @IsNotEmpty({ message: '사용 기술을 입력해주세요.'})
    tech_stack: string;
}