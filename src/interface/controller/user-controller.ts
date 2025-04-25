import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user-dto';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { UserPrismaRepo } from 'src/infra/database/prisma/repository/user-prisma.repo';
import { CreateUserUseCase } from 'src/application/user/use-case/create-user.use-case';
import { IPassHashService } from 'src/infra/services/IPassHashService';

@Controller('user')
export class UserController {
    private readonly createUserUseCase: CreateUserUseCase;
  
    constructor(private readonly prisma:PrismaService) {
        const repo = new UserPrismaRepo(prisma)
        const Hasher = new IPassHashService()
        this.createUserUseCase = new CreateUserUseCase(repo,Hasher)
    }

    @Post()
    @HttpCode(201)
    async create(@Body() dto:CreateUserDto){
        const user = await  this.createUserUseCase.createUser(dto.username,dto.password)
        return {
            id:user.id,
            username:user.username
        };
    }
}