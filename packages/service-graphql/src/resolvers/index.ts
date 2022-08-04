import { Answer, AnswerType } from "@hive/lib-survey";
import { getSurveyById, getSurveyEnpsById, getSurveys } from "./survey";

const ANSWER_TYPE_MAP = {
    [AnswerType.enum.Enps]: "AnswerEnps",
    [AnswerType.enum.FreeText]: "AnswerFreeText"
};

export const resolvers = {
    Answer: {
        __resolveType: (obj: Answer): string | null => {
            return ANSWER_TYPE_MAP[obj.type] ?? null;
        }
    },

    Survey: {
        eNPS: getSurveyEnpsById
    },

    Query: {
        surveys: getSurveys,
        survey: getSurveyById
    }
};
