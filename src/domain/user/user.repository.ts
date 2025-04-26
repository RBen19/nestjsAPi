import { User } from "./user.entity";

export interface IUserRepository{
    save(user:User):Promise<User>;
    checkUsername(username:string):Promise<boolean>
}