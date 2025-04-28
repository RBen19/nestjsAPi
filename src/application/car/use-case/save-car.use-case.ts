import { ICarRepository } from "src/domain/car/car.repository";

export class SaveCarUseCase{

    /**
     *
     */
    constructor(public readonly repo:ICarRepository) {}
}