/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;

export default db;
