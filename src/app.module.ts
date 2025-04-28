import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateUserUseCase } from './application/user/use-case/create-user.use-case';
import { PrismaService } from './infra/database/prisma/prisma.service';
import { UserPrismaRepo } from './infra/database/prisma/repository/user-prisma.repo';
import { UserController } from './interface/controller/user-controller';
import { ConfigModule } from '@nestjs/config';
import { JwtServiceImpl } from './infra/services/auth/jwtImpl';
import { CarImpl } from './infra/database/prisma/repository/car-prisma.repo.impl';
import { CarController } from './interface/controller/car-controller';
import { AuthModule } from './infra/auth/auth.module';
import { SaveCarUseCase } from './application/car/use-case/save-car.use-case';
import { FindCarsByUserId } from './application/car/use-case/findCarByUserId.use-case';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  
    }),
    AuthModule
  ],
  controllers: [AppController,UserController,CarController],
  providers: [
              AppService,CreateUserUseCase,
              PrismaService,UserPrismaRepo,
              JwtServiceImpl,CarImpl,
              SaveCarUseCase,FindCarsByUserId
            ],
})
export class AppModule {}
