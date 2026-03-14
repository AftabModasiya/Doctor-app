import { Test, type TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Patient } from "./entities/patient.entity";
import { PatientService } from "./patient.service";

describe("PatientService", () => {
	let service: PatientService;

	const mockPatientRepository = {
		create: jest.fn(),
		save: jest.fn(),
		find: jest.fn(),
		findOne: jest.fn(),
		softRemove: jest.fn(),
	};

	const mockDataSource = {
		transaction: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PatientService,
				{
					provide: getRepositoryToken(Patient),
					useValue: mockPatientRepository,
				},
				{
					provide: DataSource,
					useValue: mockDataSource,
				},
			],
		}).compile();

		service = module.get<PatientService>(PatientService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
