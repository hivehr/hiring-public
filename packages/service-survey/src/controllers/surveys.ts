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
export const getAllSurveys = async (
    _req: Request,
    res: Response
): Promise<void> => {
    const surveys = Surveys.parse(
        await getMongoCollection("surveys").find({}).toArray()
    );

    new HTTPResponse(surveys).send(res);
};

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
