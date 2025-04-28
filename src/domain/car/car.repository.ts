import { Car } from "./car.entity";

export interface ICarRepository{
    saveCar(car:Car):Promise<Car>
    checkImmatriculation(immatriculation:string):Promise<boolean>
    findCarByUserId(userId:number):Promise<Car[]>
}