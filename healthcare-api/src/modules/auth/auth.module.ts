import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from "../users/users.module";
import { ConfigModule } from "../config/config.module";

@Module({
  imports: [UsersModule, ConfigModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
