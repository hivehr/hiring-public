import { z } from "zod";

export const EnpsScore = z.number().min(-100).max(100);

export const SegmentedEnpsScores = z.object({
    promoters: z.number(),
    passives: z.number(),
    detractors: z.number()
});

export type EnpsScore = z.infer<typeof EnpsScore>;

export type SegmentedEnpsScores = z.infer<typeof SegmentedEnpsScores>;
