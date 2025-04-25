import { Injectable, OnModuleInit } from '@nestjs/common';
//import { PrismaClient } from '../generated/prisma'
import { PrismaClient } from '@prisma/client';


@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }
}