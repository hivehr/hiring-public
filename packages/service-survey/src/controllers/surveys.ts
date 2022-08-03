import { Survey, Surveys } from "@hive/lib-survey";
import { Request, Response } from "express";
import { getMongoCollection } from "../mongodb";
import { HTTPError, HTTPResponse } from "../response";

/**
 * Retrieves a list of all surveys
 *
 * @param req Express response
 * @param res Express request
 */
export async function getAllSurveys(
    { query }: Request,
    res: Response
): Promise<void> {
    const limit = Number(query.limit);
    const offset = Number(query.offset);

    const allSurveys = Surveys.parse(
        await getMongoCollection("surveys")
            .find({})
            .sort({ createdAt: 1 })
            .toArray()
    );

    const surveys = allSurveys.slice(offset, offset + limit);

    new HTTPResponse(surveys).send(res);
}

/**
 * Retrieves a specific survey by ID
 *
 * @param req Express response
 * @param res Express request
 */
export const getSurveyById = async (
    { params: { surveyId } }: Request<{ surveyId: string }>,
    res: Response
): Promise<void> => {
    const survey = Survey.parse(
        await getMongoCollection("surveys").findOne({ _id: surveyId })
    );
    if (survey == null) {
        throw new HTTPError(`Could not find survey with ID '${surveyId}'`, 400);
    }

    new HTTPResponse(survey).send(res);
};
