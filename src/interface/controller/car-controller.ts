import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/infra/auth/jwt-guard";

@Controller('api/v1/car')
export class CarController {
    @Get()
    async helloCar(){
        return 'hello from car '
    }
    @Get('/protected')
    @UseGuards(JwtAuthGuard)
    async helloProtected(){
        return ' hello miss '
    }

}