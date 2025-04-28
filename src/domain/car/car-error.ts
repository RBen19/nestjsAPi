export class CarError extends Error{
    constructor(message:string) {
        super(message);
        this.message = 'CarError'   
    }
}

export class InvalidImmatriculation extends CarError{
    constructor(immatriculation:string){
        super(`${immatriculation}  est  déjà connue de nos services et ne peut plus être attribuée`)
        this.name = 'InvalidImmatriculation'
    }
}