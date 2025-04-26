import { IUserRepository } from "src/domain/user/user.repository";
import { IPassHash } from "../interfaces/passHash";
import { User } from "src/domain/user/user.entity";
import { GetAllUserError, UsernameAlreadyTakenError } from "src/domain/user/error-user";

export class CreateUserUseCase{
    /**
     *
     */
    constructor( 
        public readonly repo:IUserRepository,
        public readonly Hasher:IPassHash) {}

   async createUser(username:string,password:string):Promise<User>{
        const exists = await this.checkUsername(username);
        if(exists){
          throw new UsernameAlreadyTakenError(username)
        }
        const hashedPass = await this.Hasher.hash(password)
        const user = new User(null,username,hashedPass)
        return this.repo.save(user)
     }
   async checkUsername(username:string):Promise<Boolean>{
     return await this.repo.checkUsername(username);
   }
   async getAllUsers(){
     try {

         const users =  await this.repo.getAllUsers()

         return users.map(user => ({
          username: user.username
         }));
         
     } catch (error) {
          throw new GetAllUserError('une erreur est survenue lors du chargement de la liste ')
     }
   }
}