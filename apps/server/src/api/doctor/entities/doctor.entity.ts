import {
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import type { User } from '../../user/entities/user.entity';
import type { Company } from '../../company/entities/company.entity';
import type { Specialization } from '../../specialization/entities/specialization.entity';
import type { Degree } from '../../degree/entities/degree.entity';
import type { Prescription } from '../../prescription/entities/prescription.entity';

@Entity('doctors')
export class Doctor extends BaseEntity {
    @Index('idx_doctors_user_id')
    @Column({ name: 'user_id' })
    userId!: number;

    @Index('idx_doctors_company_id')
    @Column({ name: 'company_id' })
    companyId!: number;

    @Column({ name: 'graduation_date', type: 'date', nullable: true })
    graduationDate!: Date | null;

    // ---- Relations ----
    @OneToOne('User', (user: User) => user.doctor)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne('Company', (company: Company) => company.doctors)
    @JoinColumn({ name: 'company_id' })
    company!: Company;

    @ManyToMany('Specialization', (spec: Specialization) => spec.doctors)
    @JoinTable({
        name: 'doctor_specialization',
        joinColumn: { name: 'doctor_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'specialization_id', referencedColumnName: 'id' },
    })
    specializations!: Specialization[];

    @ManyToMany('Degree', (degree: Degree) => degree.doctors)
    @JoinTable({
        name: 'doctor_degree',
        joinColumn: { name: 'doctor_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'degree_id', referencedColumnName: 'id' },
    })
    degrees!: Degree[];

    @OneToMany('Prescription', (prescription: Prescription) => prescription.doctor)
    prescriptions!: Prescription[];
}
