import { Module } from '@nestjs/common';
import { RouteController } from './route/route.controller';
import { RouteModule } from './route/route.module';
import { OtpController } from './otp/otp.controller';
import { OtpModule } from './otp/otp.module';

@Module({
  imports: [RouteModule, OtpModule],
  controllers: [RouteController, OtpController],
  providers: [],
})
export class AppModule {}
