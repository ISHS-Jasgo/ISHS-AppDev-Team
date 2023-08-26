class SimpleDate {

    year;
    month;
    day;
    hour;
    minute;

    constructor(year, month, day, hour, minute) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.minute = minute;
    }

    static SimpleDateYMD(year, month, day) {
        return new SimpleDate(year, month - 1, day, 0, 0);
    }

    static SimpleDateYMDH(year, month, day, hour) {
        return new SimpleDate(year, month - 1, day, hour, 0);
    }

    static SimpleDateYMDHM(year, month, day, hour, minute) {
        return new SimpleDate(year, month - 1, day, hour, minute);
    }

    static SimpleDateDHM(day, hour, minute) {
        let date = new Date();
        return new SimpleDate(date.getFullYear(), date.getMonth(), day, hour, minute);
    }

    static SimpleDateDH(day, hour) {
        let date = new Date();
        return new SimpleDate(date.getFullYear(), date.getMonth(), day, hour, 0);
    }

    toDate() {
        return new Date(this.year, this.month, this.day, this.hour, this.minute);
    }
}

export default SimpleDate;