import { IUserRepository } from "src/domain/user/user.repository";
import { PrismaService } from "../prisma.service";
import { User } from "src/domain/user/user.entity";
import { Injectable } from "@nestjs/common";
import { PrismaUserMapper } from "../mapper/prisma-user.mapper";
import { verify } from "crypto";

@Injectable()
export class UserPrismaRepo implements IUserRepository {
    /**
     *
     */
    constructor(private readonly prisma:PrismaService) {
        
    }
  async getUserByUsername(username: string): Promise<User|null> {
    const getUser = await this.prisma.user.findUnique({
      where:{
        username:username
      }
    })
    return getUser ? PrismaUserMapper.fromPrismaToDomain(getUser):null;
  }
  async login(username:string,password:string): Promise<User|null> {


    const Verifuser = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    return Verifuser ? PrismaUserMapper.fromPrismaToDomain(Verifuser) : null;
  }
   async getAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany()
    return users.map(user=> PrismaUserMapper.fromPrismaToDomain(user))
  }

 async checkUsername(username: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    const isDone = user != null ? true : false;
    return isDone;
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