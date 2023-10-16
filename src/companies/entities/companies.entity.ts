import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { RecruitEntity } from "src/recruits/entities/recruits.entity";

@Entity({ name: 'companies'})
export class CompanyEntity{
    @PrimaryGeneratedColumn()
    company_id: number;

    @Column()
    name: string;

    @Column()
    nation: string;

    @Column()
    location: string;

    @OneToMany(
        () => RecruitEntity, 
        (RecruitEntity) => RecruitEntity.recruit_id
    )
    recruit: RecruitEntity[]
}