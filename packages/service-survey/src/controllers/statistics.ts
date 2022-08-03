import {
    Answer,
    AnswerEnps,
    AnswerType,
    enps,
    Surveys
} from "@hive/lib-survey";
import { Request, Response } from "express";
import { getMongoCollection } from "../mongodb";
import { HTTPResponse } from "../response";

const isEnpsAnswer = (answer: Answer): answer is AnswerEnps =>
    answer.type === AnswerType.enum.Enps;

/**
 * Calculates the eNPS score for a given survey
 *
 * @param _req Express response
 * @param res Express request
 */
export const calculateEnps = async (
    { params: { surveyId } }: Request<{ surveyId: string }>,
    res: Response
): Promise<void> => {
    const allSurveys = Surveys.parse(
        await getMongoCollection("surveys").find().toArray()
    );

    // Ensure the survey exists
    const survey = allSurveys.find(survey => survey._id === surveyId);

    // Get a list of all eNPS scores from eNPS question responses
    const enpsScores = [];
    for (const response of survey?.responses ?? []) {
        for (const answer of response.answers) {
            if (isEnpsAnswer(answer)) {
                enpsScores.push(answer.score);
            }
        }
    }

    // Segment the ENPS scores into passives, promoters, and detractors, then calculate the score
    const segmented = enps.segmentScores(enpsScores);
    const score = enps.calculate(segmented);

    new HTTPResponse({
        score,
        segmented
    }).send(res);
};
