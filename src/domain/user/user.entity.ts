export class User {

   /**
    * constructeur l'entité metier personne 
    */
   constructor(
    public readonly id:number|null,
    public readonly username:string,
    public readonly password:string
   ) {}

    // equivaut à faire 

    /*
      public readonly id: number;
      public readonly username: string;
      public readonly password: string;

    constructor(id: number, username: string, password: string) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
    */
}