import { Injectable } from "@nestjs/common";
import * as bycrpt from 'bcrypt';
import { IPassHash } from "src/application/user/interfaces/passHash";

@Injectable()
export class IPassHashService implements IPassHash{

   private readonly saltRounds = 10;
   async hash(password: string): Promise<string> {
        return bycrpt.hash(password,this.saltRounds)
    }
    
}