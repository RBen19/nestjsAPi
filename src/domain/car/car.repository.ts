import { Car } from "./car.entity";

export interface CarRepository{
    saveCar(car:Car):Promise<Car>
}