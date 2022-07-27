import { z } from "zod";
import { IntlRecord } from "./locale";
import { QuestionEnps, QuestionFreeText } from "./question";

export const AnswerType = z.enum(["FreeText", "Enps"]);

export const AnswerEnps = z.object({
    _id: z.string().uuid(),
    type: z.literal(AnswerType.enum.Enps),
    score: z.number().min(0).max(10),
    question: QuestionEnps
});

export const AnswerFreeText = z.object({
    _id: z.string().uuid(),
    type: z.literal(AnswerType.Enum.FreeText),
    question: QuestionFreeText,
    text: IntlRecord
});

export const Answer = z.union([AnswerEnps, AnswerFreeText]);

export type AnswerType = z.infer<typeof AnswerType>;

export type AnswerEnps = z.infer<typeof AnswerEnps>;

export type AnswerFreeText = z.infer<typeof AnswerFreeText>;

export type Answer = z.infer<typeof Answer>;
