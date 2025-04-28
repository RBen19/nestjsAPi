import { NoCars } from "src/domain/car/car-error";
import { Car } from "src/domain/car/car.entity";
import { ICarRepository } from "src/domain/car/car.repository";

export class FindCarsByUserId{
    /**
     *
     */
    constructor(private readonly repo:ICarRepository) {} 

  async  execute(userId:number):Promise<Car[]>{
        const cars:Car[] = await this.repo.findCarByUserId(userId)
        if(cars.length==0)
            throw new NoCars
        return  cars;
    }
}