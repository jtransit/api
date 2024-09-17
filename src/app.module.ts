import { Module } from '@nestjs/common';
import { OtpController } from './otp/otp.controller';
import { OtpModule } from './otp/otp.module';
import { RoutesController } from './routes/routes.controller';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [OtpModule, RoutesModule],
  controllers: [OtpController, RoutesController],
  providers: [],
})
export class AppModule {}
