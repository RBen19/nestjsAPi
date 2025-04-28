import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {JwtStartegy} from './jwt.strategy'

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET || 'default-secret',
          signOptions: { expiresIn: process.env.TOKEN_EXP },
        }),
      ],
      providers: [JwtStartegy],
      exports: [JwtModule],
})
export class AuthModule {}
