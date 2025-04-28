import { Controller, Get, UseGuards,Request, Body, Response, InternalServerErrorException, Post, ConflictException } from "@nestjs/common";
import { JwtAuthGuard } from "src/infra/auth/jwt-guard";
import { CarDto } from "../dtos/car-dto";
import { SaveCarUseCase } from "src/application/car/use-case/save-car.use-case";
import { Car } from "src/domain/car/car.entity";
import { InvalidImmatriculation } from "src/domain/car/car-error";
import { CarImpl } from "src/infra/database/prisma/repository/car-prisma.repo.impl";

@Controller('api/v1/car')
export class CarController {
    /**
     *
     */
    constructor(private readonly saveCarUseCase:SaveCarUseCase,private readonly carRepoImpl:CarImpl  ) { 
        this.saveCarUseCase = new SaveCarUseCase(carRepoImpl)
    }
    @Get()
    async helloCar(){
        return 'hello from car '
    }
    @Post('/createCar')
    @UseGuards(JwtAuthGuard)
    async helloProtected(@Request() req,@Body() dto:CarDto,@Response() res){
        try {
            const car  =  new Car(null,dto. immatriculation,req.user.user_id) 
            await this.saveCarUseCase.execute(car)
        

            res.status(201).json({
                message:'nouvel enregistrement réussit ',
                                
            })
       
        } catch (error) {
            if( error instanceof InvalidImmatriculation)
                throw new ConflictException('immatriculation déjà prise')

            throw new InternalServerErrorException
        }
        
    }

}