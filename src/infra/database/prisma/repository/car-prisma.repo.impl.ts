import { Car } from "src/domain/car/car.entity";
import { CarRepository } from "src/domain/car/car.repository";
import { PrismaCarMapper } from "../mapper/prisma-car.mapper";
import { PrismaService } from "../prisma.service";

export class CarImpl implements CarRepository{
    /**
     *
     */
    constructor(private readonly prisma:PrismaService) {}
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