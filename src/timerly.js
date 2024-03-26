export function checkTime(dateTimeProvider) {
    const currentTime = dateTimeProvider.date;
    const curentHour = convertToDoubleDigits(currentTime.getHours());
    const currentMins = convertToDoubleDigits(currentTime.getMinutes());

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
        if (fullTime === '12:34' || fullTime === '01:23') {
            points = 3;
        }
    }

    return points;
}

export function formatAsTimeTaken(date) {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} - ${convertToDoubleDigits(date.getHours())}:${convertToDoubleDigits(date.getMinutes())}`;;
}

function convertToDoubleDigits(number) {
    return number.toLocaleString("en-US", { 
        minimumIntegerDigits: 2,
        useGrouping: false
    });
}