import { IUserRepository } from "src/domain/user/user.repository";
import { PrismaService } from "../prisma.service";
import { User } from "src/domain/user/user.entity";
import { Injectable } from "@nestjs/common";
import { PrismaUserMapper } from "../mapper/prisma-user.mapper";

@Injectable()
export class UserPrismaRepo implements IUserRepository {
    /**
     *
     */
    constructor(private readonly prisma:PrismaService) {
        
    }
    async save(user: User): Promise<User> {
        const data = PrismaUserMapper.fromDomainToPrisma(user);
      
        const { username, password } = data;
      
        const createData = {
          username,
          password,
        };
      
        const created = await this.prisma.user.create({
            data:{
                username:user.username,
                password:user.password
            }
        });
      
        return PrismaUserMapper.fromPrismaToDomain(created);
      }

}