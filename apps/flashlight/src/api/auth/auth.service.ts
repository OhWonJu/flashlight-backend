import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";

import { UserService } from "@lib/crud/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signIn(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<any> {
    console.log(userWhereUniqueInput);

    const user = await this.userService.getMe(userWhereUniqueInput);
    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
