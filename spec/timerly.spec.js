import { checkTime, formatAsTimeTaken, sortScores } from "../src/timerly.js";

describe('Timerly Business Logic', () => {
    let timePointDict = [
        [ new Date(2024, 2, 1, 0, 0, 0, 0), 2],
        [ new Date(2024, 2, 1, 1, 1, 0, 0), 1],
        [ new Date(2024, 2, 1, 1, 10, 0, 0), 1],
        [ new Date(2024, 2, 1, 1, 23, 0, 0), 3],
        [ new Date(2024, 2, 1, 2, 2, 0, 0), 1],
        [ new Date(2024, 2, 1, 2, 20, 0, 0), 1],
        [ new Date(2024, 2, 1, 3, 3, 0, 0), 1],
        [ new Date(2024, 2, 1, 3, 30, 0, 0), 1],
        [ new Date(2024, 2, 1, 4, 4, 0, 0), 1],
        [ new Date(2024, 2, 1, 4, 40, 0, 0), 1],
        [ new Date(2024, 2, 1, 5, 5, 0, 0), 1],
        [ new Date(2024, 2, 1, 5, 50, 0, 0), 1],
        [ new Date(2024, 2, 1, 6, 6, 0, 0), 1],
        [ new Date(2024, 2, 1, 7, 7, 0, 0), 1],
        [ new Date(2024, 2, 1, 8, 8, 0, 0), 1],
        [ new Date(2024, 2, 1, 9, 9, 0, 0), 1],
        [ new Date(2024, 2, 1, 10, 1, 0, 0), 1],
        [ new Date(2024, 2, 1, 10, 10, 0, 0), 1],
        [ new Date(2024, 2, 1, 11, 11, 0, 0), 2],
        [ new Date(2024, 2, 1, 12, 12, 0, 0), 1],
        [ new Date(2024, 2, 1, 12, 21, 0, 0), 1],
        [ new Date(2024, 2, 1, 12, 34, 0, 0), 3],
        [ new Date(2024, 2, 1, 13, 13, 0, 0), 1],
        [ new Date(2024, 2, 1, 13, 31, 0, 0), 1],
        [ new Date(2024, 2, 1, 14, 14, 0, 0), 1],
        [ new Date(2024, 2, 1, 14, 41, 0, 0), 1],
        [ new Date(2024, 2, 1, 15, 15, 0, 0), 1],
        [ new Date(2024, 2, 1, 15, 51, 0, 0), 1],
        [ new Date(2024, 2, 1, 16, 16, 0, 0), 1],
        [ new Date(2024, 2, 1, 17, 17, 0, 0), 1],
        [ new Date(2024, 2, 1, 18, 18, 0, 0), 1],
        [ new Date(2024, 2, 1, 19, 19, 0, 0), 1],
        [ new Date(2024, 2, 1, 20, 20, 0, 0), 1],
        [ new Date(2024, 2, 1, 21, 12, 0, 0), 1],
        [ new Date(2024, 2, 1, 21, 21, 0, 0), 1],
        [ new Date(2024, 2, 1, 22, 22, 0, 0), 2],
        [ new Date(2024, 2, 1, 23, 23, 0, 0), 1],
        [ new Date(2024, 2, 1, 23, 32, 0, 0), 1]
    ];

    for (let i = 0; i < timePointDict.length; i++) {
        const formattedTime = getTime(timePointDict[i][0]);
        const expectedPoints = timePointDict[i][1];
        
        it (`checkTime_Should_Return_${expectedPoints}_Point_For_Time_${formattedTime}`, () => {
            const points = checkTime({ date: timePointDict[i][0] });
    
            expect(points).toEqual(expectedPoints);
        });

        it(`formatAsTimeTaken_Should_Return_Fomatted_Time`, () => {
            const acrualFormattedTime = formatAsTimeTaken(timePointDict[i][0]);

            expect(acrualFormattedTime).toBe(`2024/3/1 - ${getTime(timePointDict[i][0])}`);
        });
    }

    it(`sortScores_Should_Order_By_Points`, () => {
        let scores = [
            { score: 1, lastUpdatedDateTimeUTC: new Date() },
            { score: 2, lastUpdatedDateTimeUTC: new Date() }
        ];

        scores = sortScores(scores);

        expect(scores[0].score).toBe(2);
        expect(scores[1].score).toBe(1);
    });

    it(`sortScores_Should_Order_By_Time_When_Scores_Are_Equal`, () => {
        let scores = [
            { id: 1, score: 2, lastUpdatedDateTimeUTC: new Date(2024, 2, 1, 0, 0, 0, 0) },
            { id: 2, score: 2, lastUpdatedDateTimeUTC: new Date(2024, 2, 1, 1, 0, 0, 0) }
        ];

        scores = sortScores(scores);

        expect(scores[0].id).toBe(1);
        expect(scores[1].id).toBe(2);
    });
});

function getTime(date) {
    return `${date.getHours().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
    })}:${date.getMinutes().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
    })}`
}
