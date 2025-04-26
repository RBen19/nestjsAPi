import { User } from "./user.entity";

export interface IUserRepository{
    save(user:User):Promise<User>;
    checkUsername(username:string):Promise<boolean>
    getAllUsers():Promise<User[]>
    getUserByUsername(username:string):Promise<User|null>
    login(username:string,password:string):Promise<User|null>
}