import moment from "moment";

// Calculate the remaining time 
export const getRemainingTime = (endingDate) => {
    var timeDiff = moment(endingDate).diff(moment(), 'days');
    if (timeDiff === 0) {
        timeDiff = moment(endingDate).diff(moment(), 'hours');
        if (timeDiff === 0) {
            timeDiff = moment(endingDate).diff(moment(), 'minutes');
            if (timeDiff === 0) {
                timeDiff = moment(endingDate).diff(moment(), 'seconds');
                return timeDiff + ' שניות';
            }
            return timeDiff + ' דקות';
        }
        return timeDiff + ' שעות';
    }
    return timeDiff + ' ימים';

}