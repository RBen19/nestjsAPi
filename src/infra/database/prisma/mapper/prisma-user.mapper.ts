import {User as PrismaUser } from '../../generated/prisma'
import { User } from 'src/domain/user/user.entity'

export class PrismaUserMapper {

    static fromPrismaToDomain(prismaUser:PrismaUser):User{
        return new User(prismaUser.idUser,prismaUser.username,prismaUser.password!)
    }

    static fromDomainToPrisma(user:User):Partial<PrismaUser>{
        return {
            username:user.username,
            password:user.password
        }
    }

}