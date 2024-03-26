import { checkTime, formatAsTimeTaken } from "../src/timerly.js";

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
