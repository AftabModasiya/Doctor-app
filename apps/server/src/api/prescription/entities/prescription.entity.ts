import { BaseEntity } from "src/common/entities/base.entity";
import type { Relation } from "typeorm";
import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
} from "typeorm";
import { Company } from "../../company/entities/company.entity";
import { Doctor } from "../../doctor/entities/doctor.entity";
import { MedicinePrescription } from "../../medicine-prescription/entities/medicine-prescription.entity";
import { Patient } from "../../patient/entities/patient.entity";

@Entity("prescriptions")
export class Prescription extends BaseEntity {
	@Index("idx_prescriptions_patient_id")
	@Column({ name: "patient_id" })
	patientId!: number;

	@Index("idx_prescriptions_doctor_id")
	@Column({ name: "doctor_id" })
	doctorId!: number;

	@Index("idx_prescriptions_company_id")
	@Column({ name: "company_id" })
	companyId!: number;

	@Column({ type: "text", nullable: true })
	diagnosis?: string;

	@Column({ type: "text", nullable: true })
	notes?: string;

	// ---- Relations ----
	@ManyToOne(
		() => Patient,
		(patient: Patient) => patient.prescriptions,
	)
	@JoinColumn({ name: "patient_id" })
	patient!: Relation<Patient>;

	@ManyToOne(
		() => Doctor,
		(doctor: Doctor) => doctor.prescriptions,
	)
	@JoinColumn({ name: "doctor_id" })
	doctor!: Relation<Doctor>;

	@ManyToOne(
		() => Company,
		(company: Company) => company.prescriptions,
	)
	@JoinColumn({ name: "company_id" })
	company!: Relation<Company>;

	@OneToMany(
		() => MedicinePrescription,
		(mp: MedicinePrescription) => mp.prescription,
		{ cascade: ["insert"] },
	)
	medicinePrescriptions!: Relation<MedicinePrescription[]>;
}
