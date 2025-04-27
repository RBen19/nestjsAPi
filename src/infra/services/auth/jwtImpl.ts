import {  Injectable, Options } from "@nestjs/common";
import { IJwtService } from "src/application/user/interfaces/IJwtService";
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class JwtServiceImpl implements IJwtService{
    private readonly secret_key:string;
    

    constructor(private readonly configService: ConfigService) {}
    /**
     *
     */
  
    
    generateToken(playload: any):string {
        const secret = this.configService.get<string>('JWT_SECRET');
        return jwt.sign(playload, secret!);
    }
    
}