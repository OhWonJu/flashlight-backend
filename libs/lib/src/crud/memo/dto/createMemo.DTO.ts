import { IsOptional, IsString } from "class-validator";

export class CreateMemoDTO {
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly content: string;

  @IsOptional()
  @IsString()
  readonly coverImage: string;

  @IsString()
  readonly userId: string;
}
