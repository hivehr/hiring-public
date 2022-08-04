import { calculate, segmentScores } from "../enps";

const calculateEnps = (
    promoters: number,
    passives: number,
    detractors: number
) => calculate({ promoters, passives, detractors });

describe("eNPS", () => {
    it("correctly calculates eNPS values", () => {
        expect(calculateEnps(74, 73, 0)).toEqual(50);
        expect(calculateEnps(52, 72, 30)).toEqual(14);
        expect(calculateEnps(32, 5, 70)).toEqual(-36);
        expect(calculateEnps(0, 0, 0)).toEqual(0);
        expect(calculateEnps(61, 43, 61)).toEqual(0);
        expect(calculateEnps(94, 77, 18)).toEqual(40);
    });

    it("correctly rounds eNPS values to whole numbers", () => {
        // (10 - 5) / 15 * 100 = 33.33333333
        // This should round down to 30
        expect(calculateEnps(10, 0, 5)).toEqual(33);

        // (23 - 16) / 39 * 100 = 17.94871795
        // This should round up to 18
        expect(calculateEnps(23, 0, 16)).toEqual(18);
    });
});

describe("segmentScores", () => {
    it("throws when a score is out of range (0-10)", () => {
        expect(() => segmentScores([20])).toThrow();
        expect(() => segmentScores([-1])).toThrow();
        expect(() => segmentScores([0])).not.toThrow();
    });

    it("correctly segments scores", () => {
        expect(segmentScores([0, 5, 4, 7, 2])).toEqual({
            promoters: 0,
            passives: 1,
            detractors: 4
        });

        expect(segmentScores([4, 6, 1, 7, 9, 2, 4])).toEqual({
            promoters: 1,
            passives: 1,
            detractors: 5
        });

        expect(segmentScores([0, 10, 9, 8, 3, 2, 6, 6])).toEqual({
            promoters: 2,
            passives: 1,
            detractors: 5
        });
    });
});
