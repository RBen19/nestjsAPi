export interface IPassHash{
    hash(password:string):Promise<string>;
}