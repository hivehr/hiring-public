import { generateMock } from "@anatine/zod-mock";
import { faker } from "@faker-js/faker";
import { z } from "zod";
import { dateString } from "../utils";
import { IntlRecord, Locale } from "./locale";
import { Response } from "./response";

export const SurveyType = z.enum(["Enps", "Custom"]);

export const Survey = z.object({
    _id: z.string().uuid(),
    type: SurveyType,
    name: IntlRecord,
    responses: z.array(Response),
    createdAt: dateString,
    updatedAt: dateString
});

export const Surveys = z.array(Survey);

export type Surveys = z.infer<typeof Surveys>;

export type SurveyType = z.infer<typeof SurveyType>;

export type Survey = z.infer<typeof Survey>;

export const mockSurvey = (): Record<string, unknown> =>
    generateMock(Survey, {
        stringMap: {
            username: faker.internet.userName,
            firstName: faker.name.firstName,
            lastName: faker.name.lastName,
            [Locale.enum.en]: faker.lorem.sentence
        }
    });
