const STARTING_HOUR = 9;
const END_HOUR= 17;
const ONE_HOUR_IN_MS = 60*60*1000;

exports.dueDateCalculator = (dateOfSubmission, turnaround) => {
    if (!(dateOfSubmission instanceof Date)){
        throw new Error('Date of submission must be an instance of Date')
    }
    if(turnaround !== parseInt(turnaround, 10)){
        throw new Error('Turnaround must be an integer')
    }
    const remainingTime = turnaround * ONE_HOUR_IN_MS;
    return reduceToWorkingHours(dateOfSubmission, remainingTime)
};

const isWeekend = startingDate =>{
    const currentDay = startingDate.getDay();
    return(currentDay === 6) || (currentDay ===0);
};

const reduceToWorkingHours = (startingDate, remainingTime) =>{
    const startingTime = startingDate;

    /*  checks if the original starting date is on a weekend,
        if it is, it keeps adding 24hrs to it until it's on a weekday */
    if (isWeekend(startingDate)){
        const incrementWithADay = 24*ONE_HOUR_IN_MS;
        const nextDay = new Date(startingTime + incrementWithADay);
        return reduceToWorkingHours(nextDay, remainingTime);
    }

    const endTime = startingDate.setHours(END_HOUR, 0,0,0);
    const difference = endTime - startingTime;
    if (difference >= remainingTime){
        return new Date(startingTime + remainingTime);
    }

    const nextDay = new Date(endTime + (24 - (END_HOUR - STARTING_HOUR)) * ONE_HOUR_IN_MS);
    return reduceToWorkingHours(nextDay, remainingTime - difference)
};