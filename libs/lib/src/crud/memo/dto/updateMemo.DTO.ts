import { IsOptional, IsString } from "class-validator";

export class UpdateMemoDTO {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly content: string;

  @IsOptional()
  @IsString()
  coverImage: string;
}
