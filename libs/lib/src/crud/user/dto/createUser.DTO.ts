import { IsOptional, IsString } from "class-validator";

export class CreateUserDTO {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly imageUrl: string;

  @IsString()
  readonly email: string;
}
