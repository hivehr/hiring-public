import { SegmentedEnpsScores } from "./definitions/enps";

/**
 * Employee Net Promoter Score (eNPS) is a way of measuring how likely your employees are to recommend your organization as a good place to work.
 * It asks one simple question: "On a scale of 0-10, how likely are you to recommend [company name] as a place to work?"
 *
 * Responses to the eNPS 0 - 10 satisfaction scale are graded into three categories:
 *
 * - Promoters (9 - 10): The most satisfied employees, happy and motivated
 * - Passives   (7 - 8): These employees are content enough, but not passionate about the business
 * - Detractors (0 - 6): Dissatisfied employees who wouldn't recommend the company
 *
 * To calculate your company eNPS, first remove the Passives. Subtract the percentage of Detractors from the percentage of Promoters, and round
 * it to the nearest whole number.
 *
 * - %Promoters – %Detractors = eNPS
 * - (Promoters / (Promoters + Passives + Detractors) * 100) - (Detractors / (Promoters + Passives + Detractors) * 100) = eNPS
 * - (Promoters - Detractors) / (Promoters + Passives + Detractors) * 100 = eNPS
 *
 * Thus, a company with 60% Promoters and 15% Detractors gives a score of 45.
 *
 * eNPS scores can, theoretically, range from +100 (every employee is a Promoter and you have the perfect company) to -100 (every employee is a
 * Detractor and your company is in trouble), with anything above 0 being an acceptable score.
 *
 * A good eNPS score is between 10 and 30; above 30 is excellent.
 *
 * @link https://delighted.com/nps-calculator
 * @param promoters Total number of responses that were promoters
 * @param passives Total number of responses that were passives
 * @param detractors Total number of responses that were detractors
 * @returns eNPS Score calculation
 */
export const calculate = ({
    promoters,
    passives,
    detractors
}: SegmentedEnpsScores): number =>
    Math.floor(
        (promoters / (promoters + passives + detractors) -
            detractors / (promoters + passives + detractors)) *
            100
    );

/**
 * Takes an array of ENPS scores, and segments them into promoters, passives, and detractors.
 *
 * Responses to the eNPS 0 - 10 satisfaction scale are graded into three categories:
 *
 * - Promoters (9 - 10): The most satisfied employees, happy and motivated
 * - Passives   (7 - 8): These employees are content enough, but not passionate about the business
 * - Detractors (0 - 6): Dissatisfied employees who wouldn't recommend the company
 *
 * @param scores Array of ENPS Scores to segment
 * @returns An object containing promoter, passive, and detractor counts
 */
export const segmentScores = (scores: number[]): SegmentedEnpsScores => {
    let promoters = 0;
    let passives = 0;
    let detractors = 0;

    for (const score of scores.values()) {
        if (score >= 9 && score <= 10) {
            promoters += 1;
        } else if (score > 7 && score <= 8) {
            passives += 1;
        } else if (score >= 0 && score <= 6) {
            detractors += 1;
        } else {
            throw new Error(
                `ENPS scores must be in range 0-10, but got '${score}'`
            );
        }
    }

    const result = {
        promoters,
        passives,
        detractors
    } as SegmentedEnpsScores;

    return result;
};
