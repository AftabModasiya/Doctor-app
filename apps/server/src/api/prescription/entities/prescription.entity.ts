import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import type { Patient } from '../../patient/entities/patient.entity';
import type { Doctor } from '../../doctor/entities/doctor.entity';
import type { Company } from '../../company/entities/company.entity';
import type { MedicinePrescription } from '../../medicine-prescription/entities/medicine-prescription.entity';

@Entity('prescriptions')
export class Prescription extends BaseEntity {
    @Index('idx_prescriptions_patient_id')
    @Column({ name: 'patient_id' })
    patientId!: number;

    @Index('idx_prescriptions_doctor_id')
    @Column({ name: 'doctor_id' })
    doctorId!: number;

    @Index('idx_prescriptions_company_id')
    @Column({ name: 'company_id' })
    companyId!: number;

    // ---- Relations ----
    @ManyToOne('Patient', (patient: Patient) => patient.prescriptions)
    @JoinColumn({ name: 'patient_id' })
    patient!: Patient;

    @ManyToOne('Doctor', (doctor: Doctor) => doctor.prescriptions)
    @JoinColumn({ name: 'doctor_id' })
    doctor!: Doctor;

    @ManyToOne('Company', (company: Company) => company.patients)
    @JoinColumn({ name: 'company_id' })
    company!: Company;

    @OneToMany(
        'MedicinePrescription',
        (mp: MedicinePrescription) => mp.prescription,
        { cascade: ['insert'] },
    )
    medicinePrescriptions!: MedicinePrescription[];
}
