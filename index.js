const STARTING_HOUR = 9;
const END_HOUR= 17;
const ONE_HOUR_IN_MS = 60*60*1000;

module.exports = (dateOfSubmission, turnaround);{
    const remainingTime = 0;

    return justInWorkingHours(dateOfSubmission, remainingTime)
}

function isWeekend(startingDate) {
    const currentDay = startingDate.getDay();
    return(currentDay === 6 || currentDay ===0);
}

function justInWorkingHours(startingDate, remainingTime) {

}