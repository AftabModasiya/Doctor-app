import { Test, type TestingModule } from "@nestjs/testing";
import { PatientController } from "./patient.controller";
import { PatientService } from "./patient.service";

describe("PatientController", () => {
	let controller: PatientController;

	const mockPatientService = {
		create: jest.fn(),
		findAll: jest.fn(),
		findOne: jest.fn(),
		update: jest.fn(),
		remove: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PatientController],
			providers: [
				{
					provide: PatientService,
					useValue: mockPatientService,
				},
			],
		}).compile();

		controller = module.get<PatientController>(PatientController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
