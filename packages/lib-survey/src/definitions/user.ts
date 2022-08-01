import { z } from "zod";

export const User = z.object({
    _id: z.string().uuid(),
    username: z.string(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string()
});

export type User = z.infer<typeof User>;
