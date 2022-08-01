import { z } from "zod";
import { IntlRecord } from "./locale";

export const QuestionType = z.enum(["FreeText", "Enps"]);

export const QuestionEnps = z.object({
    _id: z.string().uuid(),
    type: z.literal(QuestionType.enum.Enps),
    text: IntlRecord
});

export const QuestionFreeText = z.object({
    _id: z.string().uuid(),
    type: z.literal(QuestionType.enum.FreeText),
    text: IntlRecord
});

export const Question = z.union([QuestionEnps, QuestionFreeText]);

export type QuestionType = z.infer<typeof QuestionType>;

export type QuestionEnps = z.infer<typeof QuestionEnps>;

export type QuestionFreeText = z.infer<typeof QuestionFreeText>;

export type Question = z.infer<typeof Question>;
