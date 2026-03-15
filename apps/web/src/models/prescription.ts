export interface IMedicine {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    createdBy: number | null;
    updatedBy: number | null;
    name: string;
    companyId: number;
    categoryId: number;
}

export interface IMedicinePrescription {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    createdBy: number | null;
    updatedBy: number | null;
    medicineId: number;
    prescriptionId: number;
    quantity: number;
    medicine: IMedicine;
}

export interface IPatient {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    createdBy: number | null;
    updatedBy: number | null;
    userId: number;
    companyId: number;
    address: string;
    bloodGroup: string;
    status: string;
    user?: {
        id: number;
        name: string;
    };
}

export interface IDoctor {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    createdBy: number | null;
    updatedBy: number | null;
    userId: number;
    companyId: number;
    graduationDate: string;
    experience: number;
    user?: {
        id: number;
        name: string;
    };
}

export interface IPrescription {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    createdBy: number | null;
    updatedBy: number | null;
    patientId: number;
    doctorId: number;
    companyId: number;
    diagnosis: string;
    notes: string;
    patient: IPatient;
    doctor: IDoctor;
    medicinePrescriptions: IMedicinePrescription[];
}

export interface ICreatePrescriptionRequest {
    patientId: number;
    doctorId: number;
    companyId: number;
    diagnosis: string;
    notes: string;
    medicinePrescriptions: {
        medicineId: number;
        quantity: number;
    }[];
}

export interface IPrescriptionResponse {
    success: boolean;
    data: {
        list: {
            count: number;
            list: IPrescription[];
        };
    };
    statusCode: number;
    message: string;
}
