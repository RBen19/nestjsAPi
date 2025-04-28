import { Car as PrismaCar } from "../../generated/prisma";
import { Car as DomainCar } from "src/domain/car/car.entity";

export class PrismaMapper{
    static fromDomainToPrisma(car:DomainCar):Partial<PrismaCar>{
        return {
            Immatriculation : car.immatriculation,
            UserId: car.userId
        }
    }

    static fromPrismaToDomain(car:PrismaCar):DomainCar{
        return new DomainCar(car.idCar,car.Immatriculation,car.UserId)
    }
}