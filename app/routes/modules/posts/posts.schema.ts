import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1),
  isDone: z.boolean().default(false),
});

export const updateCeklisSchema = z.object({
  id: z.number(),
  isDone: z.boolean(),
});

export const updateTitleSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
});
