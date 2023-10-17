import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { CompanyEntity } from "src/companies/entities/companies.entity";
import { ApplyEntity } from "src/apply/entities/apply.entity";

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
    company: CompanyEntity;

    @OneToMany(
        () => ApplyEntity,
        (apply) => apply.recruit
    )
    apply: ApplyEntity[];
}