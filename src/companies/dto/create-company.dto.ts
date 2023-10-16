import { IsString, IsNotEmpty } from "class-validator";

export class CreateCompanyDto{
    @IsString()
    @IsNotEmpty({ message: '회사명을 입력해주세요.'})
    name: string;

    @IsString()
    @IsNotEmpty({ message: '국가명을 입력해주세요.'})
    nation: string;

    @IsString()
    @IsNotEmpty({ message: '지역명을 입력해주세요.'})
    location: string;
}