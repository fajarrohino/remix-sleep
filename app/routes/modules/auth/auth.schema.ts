import { z } from "zod";

export const authLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export const authRegisterSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});
