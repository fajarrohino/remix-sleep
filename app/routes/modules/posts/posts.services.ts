import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { createPostSchema, updateCeklisSchema, updateTitleSchema } from "./posts.schema";

const prisma = new PrismaClient();

export async function getPosts() {
  return await prisma.post.findMany({
    orderBy: {
      id: "desc",
    },
  });
}

export async function createPost(data: z.infer<typeof createPostSchema>) {
  return await prisma.post.create({ data });
}

export async function updateCeklisPost(data: z.infer<typeof updateCeklisSchema>) {
  return await prisma.post.update({
    data,
    where: {
      id: data.id,
    },
  });
}

export async function updateTitlePost(data: z.infer<typeof updateTitleSchema>) {
  return await prisma.post.update({
    data,
    where: {
      id: data.id,
    },
  });
}

export async function deletePost(id: number) {
  return await prisma.post.delete({
    where: {
      id,
    },
  });
}
