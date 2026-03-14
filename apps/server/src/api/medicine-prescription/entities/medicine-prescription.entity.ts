import { BaseEntity } from "src/common/entities/base.entity";
import type { Relation } from "typeorm";
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Medicine } from "../../medicine/entities/medicine.entity";
import { Prescription } from "../../prescription/entities/prescription.entity";

@Entity("medicine_prescriptions")
export class MedicinePrescription extends BaseEntity {
	@Index("idx_medicine_prescriptions_medicine_id")
	@Column()
	medicineId!: number;

	@Index("idx_medicine_prescriptions_prescription_id")
	@Column()
	prescriptionId!: number;

	@Column({ type: "int", default: 1 })
	quantity!: number;

	// ---- Relations ----
	@ManyToOne(
		() => Medicine,
		(medicine: Medicine) => medicine.medicinePrescriptions,
	)
	@JoinColumn()
	medicine!: Relation<Medicine>;

	@ManyToOne(
		() => Prescription,
		(prescription: Prescription) => prescription.medicinePrescriptions,
	)
	@JoinColumn()
	prescription!: Relation<Prescription>;
}
