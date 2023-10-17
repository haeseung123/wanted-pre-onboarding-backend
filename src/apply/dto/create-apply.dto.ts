import { IsInt, IsNotEmpty } from "class-validator";

export class CreateApplyDto{
    @IsInt()
    @IsNotEmpty({ message: '지원하실 채용공고 ID를 입력해주세요.'})
    recruit_id: number;

    @IsInt()
    @IsNotEmpty({ message: '유저 ID를 입력해주세요.'})
    user_id: number;
}

//잠시 보류