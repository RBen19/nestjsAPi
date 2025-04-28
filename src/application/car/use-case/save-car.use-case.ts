import { InvalidImmatriculation } from "src/domain/car/car-error";
import { Car } from "src/domain/car/car.entity";
import { ICarRepository } from "src/domain/car/car.repository";

export class SaveCarUseCase{

    /**
     *
     */
    constructor(public readonly repo:ICarRepository) {}

    async execute(car:Car):Promise<Car>{
        const isInvidlImmatriculation =  await this.repo.checkImmatriculation(car.immatriculation)

        if(isInvidlImmatriculation)
            throw new InvalidImmatriculation(car.immatriculation)
        return await this.repo.saveCar(car)

    }
}