import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../common/entities/base.entity";
import type { Medicine } from "../../medicine/entities/medicine.entity";
import type { Prescription } from "../../prescription/entities/prescription.entity";

@Entity("medicine_prescriptions")
export class MedicinePrescription extends BaseEntity {
	@Index("idx_medicine_prescriptions_medicine_id")
	@Column({ name: "medicine_id" })
	medicineId!: number;

	@Index("idx_medicine_prescriptions_prescription_id")
	@Column({ name: "prescription_id" })
	prescriptionId!: number;

	// ---- Relations ----
	@ManyToOne("Medicine", (medicine: Medicine) => medicine.medicinePrescriptions)
	@JoinColumn({ name: "medicine_id" })
	medicine!: Medicine;

	@ManyToOne(
		"Prescription",
		(prescription: Prescription) => prescription.medicinePrescriptions,
	)
	@JoinColumn({ name: "prescription_id" })
	prescription!: Prescription;
}
