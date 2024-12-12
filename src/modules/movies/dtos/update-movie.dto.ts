import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Max, MaxLength } from "class-validator";

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Max(new Date().getFullYear())
  publishingYear?: number;

  @IsOptional()
  image?: Express.Multer.File;
}
