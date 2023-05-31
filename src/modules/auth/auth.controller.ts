import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SystemResponse } from "../../common/responses/system.response";
import { AuthService } from "./auth.service";
import { GetAccessTokenDto } from "./dto/GetAccessToken.dto";
import { LoginDto } from "./dto/Login.dto";
@Controller("/auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  async login(@Body() loginBody: LoginDto) {
    try {
      const { password, username, email } = loginBody;
      const result = await this.authService.login(password, username, email);

      return new SystemResponse(result);
    } catch (error) {
      return {
        error,
      };
    }
  }

  @Post("/accessToken")
  async getAccessToken(@Body() getAccessTokenBody: GetAccessTokenDto) {
    try {
      const { refreshToken } = getAccessTokenBody;
      const result = await this.authService.getAccessToken(refreshToken);

      return new SystemResponse(result);
    } catch (error) {
      return {
        error,
      };
    }
  }
}
