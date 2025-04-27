export interface IJwtService{
    generateToken(playload:any):string;
}