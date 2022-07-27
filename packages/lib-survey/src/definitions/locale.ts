import { z } from "zod";
import { literalRecord } from "../utils";

export const Locale = z.enum(["en"]);

export const IntlRecord = literalRecord(Locale.options, z.string());

export type Locale = z.infer<typeof Locale>;

export type IntlRecord = z.infer<typeof IntlRecord>;
