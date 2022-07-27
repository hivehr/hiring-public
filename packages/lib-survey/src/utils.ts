import { z } from "zod";

export const dateString = z.preprocess(arg => {
    if (typeof arg == "string" || arg instanceof Date) {
        return new Date(arg);
    }
}, z.date());

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const literalRecord = <
    KeyType extends string,
    ZodValueType extends z.ZodTypeAny
>(
    keys: KeyType[],
    zodValueType: ZodValueType
) =>
    z.object(
        keys.reduce(
            (agg, k) => ({
                ...agg,
                [k]: zodValueType
            }),
            {} as Record<KeyType, ZodValueType>
        )
    );
