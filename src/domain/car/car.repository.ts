import { Car } from "./car.entity";

export interface ICarRepository{
    saveCar(car:Car):Promise<Car>
}