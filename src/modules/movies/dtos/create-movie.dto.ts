import { IsInt, IsString, Max, MaxLength } from "class-validator";
import { Type } from "class-transformer";

export class CreateMovieDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @Type(() => Number)
  @IsInt()
  @Max(new Date().getFullYear())
  publishingYear: number;
}
