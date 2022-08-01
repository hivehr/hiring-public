import { Survey } from "@hive/lib-survey";
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
    unknown,
    Promise<Survey[]>
> = async () => {
    const { data } = await surveyAxios.get<SurveyResponse<Survey[]>>("/");

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
