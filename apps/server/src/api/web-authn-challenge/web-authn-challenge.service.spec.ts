import { Test, TestingModule } from "@nestjs/testing";
import { WebAuthnChallengeService } from "./web-authn-challenge.service";

describe("WebAuthnChallengeService", () => {
	let service: WebAuthnChallengeService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [WebAuthnChallengeService],
		}).compile();

		service = module.get<WebAuthnChallengeService>(WebAuthnChallengeService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
