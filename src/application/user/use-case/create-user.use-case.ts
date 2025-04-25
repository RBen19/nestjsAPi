import { IUserRepository } from "src/domain/user/user.repository";
import { IPassHash } from "../interfaces/passHash";
import { User } from "src/domain/user/user.entity";

export class CreateUserUseCase{
    /**
     *
     */
    constructor( 
        public readonly repo:IUserRepository,
        public readonly Hasher:IPassHash) {}

   async createUser(username:string,password:string):Promise<User>{
        const hashedPass = await this.Hasher.hash(password)
        const user = new User(null,username,hashedPass)
        return this.repo.save(user)
   }
}