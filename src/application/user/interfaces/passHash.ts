export interface IPassHash{
    hash(password:string):Promise<string>;
    compare(password:string,HashedPass:string):Promise<Boolean>
}