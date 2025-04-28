import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt,Strategy } from "passport-jwt";

@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy){

     
      constructor() {
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.JWT_SECRET!,
            ignoreExpiration:false,
        });
        
    }
    async validate(playload: any) {
       return { user_id: playload.sub }
    }
  

}