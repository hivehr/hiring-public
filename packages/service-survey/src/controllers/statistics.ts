import { Request, Response } from "express";
import { HTTPResponse } from "../response";

/**
 * Calculates the eNPS score for a given survey
 *
 * @param _req Express response
 * @param res Express request
 */
export const calculateEnps = async (
    _req: Request<{ surveyId: string }>,
    res: Response
): Promise<void> => {
    new HTTPResponse({
        score: 0,
        segmented: {
            detractors: 0,
            passives: 0,
            promoters: 0
        }
    }).send(res);
};
