import { Test, TestingModule } from "@nestjs/testing";
import { WebAuthnChallengeController } from "./web-authn-challenge.controller";
import { WebAuthnChallengeService } from "./web-authn-challenge.service";

describe("WebAuthnChallengeController", () => {
	let controller: WebAuthnChallengeController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [WebAuthnChallengeController],
			providers: [WebAuthnChallengeService],
		}).compile();

		controller = module.get<WebAuthnChallengeController>(
			WebAuthnChallengeController,
		);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
