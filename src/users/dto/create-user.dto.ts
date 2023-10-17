import { IsString, IsNotEmpty } from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty({ message: '아이디를 입력해주세요.' })
    id: string;

    @IsString()
    @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
    password: string;
}