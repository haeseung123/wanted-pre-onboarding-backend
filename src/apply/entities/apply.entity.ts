import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { UserEntity } from "src/users/entities/users.entity";
import { RecruitEntity } from "src/recruits/entities/recruits.entity";

@Entity({ name: 'apply' })
export class ApplyEntity{
    @PrimaryGeneratedColumn()
    apply_id: number;

    @ManyToOne(() => RecruitEntity, { eager: true })
    @JoinColumn({ name: 'recruit_id' })
    recruit: RecruitEntity;

    @OneToOne(
        () => UserEntity,
        (UserEntity) => UserEntity.user_id,
        { nullable: false }
    )
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
}