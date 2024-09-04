import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('otp')
@ApiTags('otp')
export class OtpController {

  @Get()
  getOtp(): object {
    return {
      message: "13Cxx"
    }
  }
}
