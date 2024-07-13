import { Module } from '@nestjs/common';
import { ControllerModule } from './controller/controller.module';
import { ServiceModule } from './service/service.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [ControllerModule, ServiceModule, UsersModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
