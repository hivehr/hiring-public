import { z } from "zod";
import { Answer } from "./answer";
import { User } from "./user";

export const Response = z.object({
    _id: z.string().uuid(),
    user: User,
    answers: z.array(Answer)
});

export type Response = z.infer<typeof Response>;
