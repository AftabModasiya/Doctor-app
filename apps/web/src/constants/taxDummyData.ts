const DUMMY_TAXES = [
	{ id: 1, name: 'Base Cost', code: 'BASE_COST' },
	{ id: 2, name: 'Logistics Fee', code: 'LOGISTICS_FEE' },
	{ id: 3, name: 'Local Tax', code: 'LOCAL_TAX' },
	{ id: 4, name: 'Insurance Fee', code: 'INSURANCE_FEE' },
	{ id: 5, name: 'Handling Fee', code: 'HANDLING_FEE' },
	{ id: 6, name: 'Customs Duty', code: 'CUSTOMS_DUTY' }
];

const VALUE_TYPES = [
	{ label: '%', value: 'percentage' },
	{ label: 'Fixed Value', value: 'fixed' }
];

const OPERATORS = [
	{ label: '+', value: 'add' },
	{ label: '-', value: 'subtract' },
	{ label: '*', value: 'multiply' },
	{ label: '%', value: 'modulo' }
];

export interface TaxMarkupConfig {
	taxId: number;
	taxName: string;
	valueType: 'percentage' | 'fixed';
	currency: string;
	operator: 'add' | 'subtract' | 'multiply' | 'modulo';
	isActive: boolean;
}

export { DUMMY_TAXES, VALUE_TYPES, OPERATORS };
