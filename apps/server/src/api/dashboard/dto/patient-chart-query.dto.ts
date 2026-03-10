import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const PatientChartQuerySchema = z.object({
	startDate: z.iso.date().optional().describe("Start date in ISO format"),
	endDate: z.iso.date().optional().describe("End date in ISO format"),
});

export class PatientChartQueryDto extends createZodDto(
	PatientChartQuerySchema,
) {}
