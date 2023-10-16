import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { CompanyEntity } from "src/companies/entities/companies.entity";

@Entity({ name: 'recruits'})
export class RecruitEntity{
    @PrimaryGeneratedColumn()
    recruit_id: number;

    @Column()
    position: string;

    @Column()
    reward: number;

    @Column()
    description: string;

    @Column()
    tech_stack: string;

    @ManyToOne(
        () => CompanyEntity, 
        (CompanyEntity) => CompanyEntity.company_id,
        { nullable: false }
    )
    @JoinColumn({ name: 'company_id'})
    company: CompanyEntity
}