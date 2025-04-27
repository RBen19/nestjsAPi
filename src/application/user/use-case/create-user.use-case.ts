import { IUserRepository } from "src/domain/user/user.repository";
import { IPassHash } from "../interfaces/passHash";
import { User } from "src/domain/user/user.entity";
import { GetAllUserError, InvalidCredentialsError, UsernameAlreadyTakenError } from "src/domain/user/error-user";
import { IJwtService } from "../interfaces/IJwtService";


export class CreateUserUseCase{
    /**
     *
     */
   
    constructor( 
        public readonly repo:IUserRepository,
        public readonly Hasher:IPassHash,
        public readonly jwt:IJwtService
     ) {}

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
   async login(username:string,password:string):Promise<string>{

     const user = await this.repo.getUserByUsername(username)
     if(user==null)
          throw new InvalidCredentialsError()
     if(!this.repo.checkUsername(username))
          throw new InvalidCredentialsError()

     if(!this.Hasher.compare(user!.password, password))
          throw new InvalidCredentialsError()

     const playload =  {sub:user.id,username:user.username}
     const token = this.jwt.generateToken(playload);
     console.log(token)
     return this.jwt.generateToken(playload);
   
   
   }
}