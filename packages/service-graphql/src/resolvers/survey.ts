import { Survey } from "@hive/lib-survey";
import { SegmentedEnpsScores } from "@hive/lib-survey/src/enps";
import axios from "axios";
import { GraphQLFieldResolver } from "graphql";

const surveyAxios = axios.create({
    baseURL: "http://localhost:5000/survey"
});

type SurveyResponse<Data = unknown> = {
    data: Data;
    errors: string[] | null;
};

export const getSurveys: GraphQLFieldResolver<
    unknown,
    unknown,
    { offset?: number; limit?: number },
    Promise<Survey[]>
> = async (_, { limit, offset }) => {
    const { data } = await surveyAxios.get<SurveyResponse<Survey[]>>("/", {
        params: { limit, offset }
    });

    return data.data;
};

export const getSurveyById: GraphQLFieldResolver<
    unknown,
    unknown,
    { id: string },
    Promise<Survey>
> = async (_, { id }) => {
    const { data } = await surveyAxios.get<SurveyResponse<Survey>>(`/${id}`);

    return data.data;
};

export const getSurveyEnpsById: GraphQLFieldResolver<
    Survey,
    unknown,
    unknown,
    Promise<{
        score: number;
        segmented: SegmentedEnpsScores;
    }>
> = async ({ _id: id }) => {
    const { data } = await surveyAxios.get<
        SurveyResponse<{
            score: number;
            segmented: SegmentedEnpsScores;
        }>
    >(`/${id}/statistics/enps`);

    return data.data;
};
