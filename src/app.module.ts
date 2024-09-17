import { Module } from '@nestjs/common';
import { OtpController } from './otp/otp.controller';
import { OtpModule } from './otp/otp.module';
import { RoutesController } from './routes/routes.controller';
import { RoutesModule } from './routes/routes.module';
import { RoutesService } from './routes/routes.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [OtpModule, RoutesModule, HttpModule, ConfigModule.forRoot()],
  controllers: [OtpController, RoutesController],
  providers: [RoutesService],
})
export class AppModule {}
