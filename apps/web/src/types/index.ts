export interface Patient {
	id: string;
	name: string;
	age: number;
	gender: 'Male' | 'Female' | 'Other';
	phone: string;
	email: string;
	bloodGroup: string;
	address: string;
	registeredDate: string;
	status: 'Active' | 'Inactive';
	lastVisit: string;
}

export interface Doctor {
	id: string;
	name: string;
	specialization: string;
	phone: string;
	email: string;
	experience: number;
	qualification: string;
	status: 'Active' | 'On Leave' | 'Inactive';
	consultationFee: number;
	availability: string[];
	rating: number;
	patients: number;
}

export interface Medicine {
	id: string;
	name: string;
	category: string;
	manufacturer: string;
	stock: number;
	unit: string;
	price: number;
	expiryDate: string;
	status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Near Expiry';
}

export interface PrescriptionMedicine {
	medicineId: string;
	medicineName: string;
	dosage: string;
	frequency: string;
	duration: string;
}

export interface Prescription {
	id: string;
	patientId: string;
	patientName: string;
	doctorId: string;
	doctorName: string;
	date: string;
	diagnosis: string;
	medicines: PrescriptionMedicine[];
	notes: string;
	status: 'Active' | 'Completed' | 'Cancelled';
}

export interface Appointment {
	id: string;
	patientId: string;
	patientName: string;
	doctorId: string;
	doctorName: string;
	date: string;
	time: string;
	type: 'New Patient' | 'Follow-up' | 'Consultation' | 'Emergency';
	status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
	notes: string;
}

export interface ActivityItem {
	id: string;
	type: 'appointment' | 'patient' | 'prescription' | 'medicine' | 'doctor';
	message: string;
	time: string;
	icon: string;
}

export interface AdminUser {
	id: string;
	name: string;
	email: string;
	role: string;
	avatar?: string;
}
