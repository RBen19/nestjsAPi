import { IsString, MinLength } from "class-validator";

export class CarDto{
    @IsString()
    @MinLength(4)
    immatriculation:string
}