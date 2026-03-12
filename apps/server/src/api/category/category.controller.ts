import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JWTAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@UseGuards(JWTAuthGuard)
@ApiBearerAuth()
@Controller("category")
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	create(@Body() createCategoryDto: CreateCategoryDto) {
		return this.categoryService.create(createCategoryDto);
	}

	@Get()
	findAll() {
		return this.categoryService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.categoryService.findOne(+id);
	}

	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateCategoryDto: UpdateCategoryDto,
	) {
		return this.categoryService.update(+id, updateCategoryDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.categoryService.remove(+id);
	}
}
