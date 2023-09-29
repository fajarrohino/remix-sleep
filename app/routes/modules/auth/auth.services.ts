import { PrismaClient } from "@prisma/client";
import { authRegisterSchema } from "./auth.schema";
import { z } from "zod";


const prisma = new PrismaClient()

export async function autgRegisterServices(data: z.infer<typeof authRegisterSchema>){
   return await prisma.post.create({data})
}
