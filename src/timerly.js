export function checkTime(dateTimeProvider) {
    const currentTime = dateTimeProvider.date;
    const timeParts = getLocalTime(currentTime);
    const curentHour = timeParts[0];
    const currentMins = timeParts[1];

    let points = 0;
    let pointsSet = false;

    if (curentHour === currentMins) {
        if (curentHour == 0 || curentHour == 11 || curentHour == 22) {
            // 00:00, 11:11, 22:22
            points = 2;
        } else {
            // 01:01, 02:02, ..., 13:13, 14:14, etc
            points = 1;
        }
        pointsSet = true;
    }

    if (pointsSet === false) {
        if (curentHour == `${currentMins[1]}${currentMins[0]}`) {
            // 01:10, 02:20, 03:30, etc
            points = 1;
            pointsSet = true;
        }
    }


    if (pointsSet === false) {
        const fullTime = `${curentHour}:${currentMins}`;
        if (fullTime === '01:23' || fullTime === '12:34' || fullTime === '23:45') {
            points = 3;
        }
    }

    return points;
}

export function formatAsTimeTaken(date) {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} - ${formatLocalStringTime(date)}`;;
}

export function sortScores(scores) {
    return scores.sort((a, b) => {
        const scoreDiff = b.score - a.score;

        if (scoreDiff) {
            return scoreDiff;
        }

        return new Date(a.lastUpdatedDateTimeUTC) - new Date(b.lastUpdatedDateTimeUTC);
    });
}

function formatLocalStringTime(time) {
    let parts = getLocalTime(time);
    return `${parts[0]}:${parts[1]}`;
}

function getLocalTime(time) {
    return time
        .toLocaleTimeString('en-GB', { timeZone: 'Europe/London' })
        .split(':');
}

function convertToDoubleDigits(number) {
    return number.toLocaleString("en-US", { 
        minimumIntegerDigits: 2,
        useGrouping: false
    });
}