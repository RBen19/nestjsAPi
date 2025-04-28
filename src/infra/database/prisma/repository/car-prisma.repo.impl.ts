import { Car } from "src/domain/car/car.entity";
import { ICarRepository } from "src/domain/car/car.repository";
import { PrismaCarMapper } from "../mapper/prisma-car.mapper";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CarImpl implements ICarRepository{
    /**
     *
     */
    constructor(private readonly prisma:PrismaService) {}
   async findCarByUserId(userId: number): Promise<Car[]> {
        const cars = await this.prisma.car.findMany({
            where:{
                UserId:userId
            }
        });

       const domainCars: Car[] = cars.map(c => PrismaCarMapper.fromPrismaToDomain(c));
       return domainCars;
        
    }
    
   async checkImmatriculation(immatriculation: string): Promise<boolean> {
        const car =  await this.prisma.car.findUnique({
            where:{
                Immatriculation:immatriculation!
            }
        })
        return car !=null ? true:false
    }
  async  saveCar(car: Car): Promise<Car> {

        const prismaCar = PrismaCarMapper.fromDomainToPrisma(car);
        const created =  await this.prisma.car.create({
           data:{
            Immatriculation:prismaCar.Immatriculation!,
            UserId:prismaCar.UserId!
           }
        });

        return PrismaCarMapper.fromPrismaToDomain(created);
    }
    
}