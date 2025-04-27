import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateUserUseCase } from './application/user/use-case/create-user.use-case';
import { PrismaService } from './infra/database/prisma/prisma.service';
import { UserPrismaRepo } from './infra/database/prisma/repository/user-prisma.repo';
import { UserController } from './interface/controller/user-controller';
import { ConfigModule } from '@nestjs/config';
import { JwtServiceImpl } from './infra/services/auth/jwtImpl';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  
    })
  ],
  controllers: [AppController,UserController],
  providers: [AppService,CreateUserUseCase,PrismaService,UserPrismaRepo,JwtServiceImpl],
})
export class AppModule {}
