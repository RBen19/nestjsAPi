import { Body, ConflictException, Controller, Get, HttpCode, InternalServerErrorException, Param, Post, Res } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user-dto';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { UserPrismaRepo } from 'src/infra/database/prisma/repository/user-prisma.repo';
import { CreateUserUseCase } from 'src/application/user/use-case/create-user.use-case';
import { IPassHashService } from 'src/infra/services/IPassHashService';
import { Response } from 'express';
import { UsernameAlreadyTakenError } from 'src/domain/user/error-user';
@Controller('api/v1/user')
export class UserController {
    private readonly createUserUseCase: CreateUserUseCase;
  
    constructor(private readonly prisma:PrismaService) {
        const repo = new UserPrismaRepo(prisma)
        const Hasher = new IPassHashService()
        this.createUserUseCase = new CreateUserUseCase(repo,Hasher)
    }

    @Post()
    async create(@Body() dto:CreateUserDto,@Res() res:Response){
        try {
            const user = await  this.createUserUseCase.createUser(dto.username,dto.password)
            res.status(201).json({message:'utilisateur créer'})
        } catch (error) {

            if(error instanceof UsernameAlreadyTakenError)
                throw new ConflictException(error.message)

            throw new InternalServerErrorException('erreur de serveur')

        }
      
    }
    @Get('exists/:username')
    async checkUsername(
        @Param('username') username:string,
        @Res() res:Response
    ):Promise<void>{
        const exists = await this.createUserUseCase.checkUsername(username)
        if(exists){
            res.status(409).json({message: 'ce username est déjà pris'})
        }else{
            res.status(200).json({message:'username valide'})
        }
    }

}