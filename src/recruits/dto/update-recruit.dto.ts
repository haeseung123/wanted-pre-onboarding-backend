import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateRecruitDto } from "./create-recruit.dto";

export class UpdateRecruitDto extends OmitType(CreateRecruitDto, ['company_id'] as const) {

}