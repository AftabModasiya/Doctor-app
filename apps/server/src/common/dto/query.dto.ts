import { createZodDto } from "nestjs-zod";
import { getQuerySortOrder } from "src/shared/constants/app.constants";
import { z } from "zod";

export const commonListFiltersSchema = z.object({
	startAt: z.iso.date().optional(),

	endAt: z.iso.date().optional(),

	page: z.coerce.number().int().min(1).default(1),

	perPage: z.coerce.number().int().min(1).max(100).default(20),

	sort: z
		.enum(Object.values(getQuerySortOrder()))
		.default(getQuerySortOrder().DESC),

	sortBy: z.string().min(1).default("createdAt"),

	search: z.string().trim().min(1).max(100).optional(),
});

export class CommonListFiltersDto extends createZodDto(
	commonListFiltersSchema,
) {}
