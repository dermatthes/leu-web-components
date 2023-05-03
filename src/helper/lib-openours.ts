/* from date/openhours.js */
export let KaToolsV1 = {
    openhours: class {
        public _vacations = [];
        public _openHours = [];

        constructor() {
            this._vacations = [];
            this._openHours = [];
        }

        addVacation(from, till, opt) {
            [from, till] = KaToolsV1.date.mkdate(from, till);
            from = KaToolsV1.date.midnight(0, from);
            till = KaToolsV1.date.midnight(0, till);
            this._vacations.push({from, till, opt});
        }

        addOpenHours(dayOfWeek, from, till, opt) {
            from = KaToolsV1.date.mkTime(from)
            till = KaToolsV1.date.mkTime(till)
            this._openHours.push({day: dayOfWeek, from, till, opt});
        }

        _sort() {
            let sort = (a, b) => {
                if (a.from.toString() === b.from.toString())
                    return 0;
                return a.from.toString() < b.from.toString() ? -1 : 1
            };
            this._openHours.sort(sort);
            this._vacations.sort(sort);
        }

        /**
         * Return the Vacation if the current date in parameter 1 is during vacation
         *
         * @param date
         * @returns {null|*}
         */
        getVacation(date) {
            this._sort();
            let d = KaToolsV1.date;
            date = d.midnight(0, d.mkdate(date));

            let vac = this._vacations.find((item) => {
                return item.from <= date && item.till >= date
            });
            return typeof vac === "undefined" ? null : vac;
        }

        getOpenHoursForDay(date) {
            this._sort();
            date = KaToolsV1.date.mkdate(date);

            return this._openHours.filter((item) => {
                if (item.day !== date.getDay())
                    return false;
                return item.from.toString() >= KaToolsV1.date.mkTime(date).toString()
            })
        }

        getOpenHoursForDate(date) {
            if (this.getVacation(date) !== null)
                return [];
            return this.getOpenHoursForDay(date);
        }


        isOpen(date = null) {
            date = KaToolsV1.date.mkdate(date);
            if (this.getVacation(date) !== null)
                return false;
            let openHours = this._openHours.filter((item) => {
                let curTime = KaToolsV1.date.mkTime(date).toString();
                if (item.day !== date.getDay())
                    return false;
                if (item.from.toString() <= curTime && item.till.toString() >= curTime)
                    return true;
                return false;
            })
            return openHours.length > 0;
        }

        getNextOpenDate(date = null) {
            date = KaToolsV1.date.mkdate(date);


            for (let dayOffset = 0; dayOffset < 60; dayOffset++) {
                let curDate = KaToolsV1.date.offset(dayOffset, date);
                if (dayOffset > 0)
                    curDate = KaToolsV1.date.midnight(dayOffset, date);

                if (this.getVacation(curDate) !== null)
                    continue;

                let openHours = this.getOpenHoursForDay(curDate);
                let foundOpenHours = openHours.filter((item) => {
                    let curTime = KaToolsV1.date.mkTime(curDate);
                    if (curTime.toString() < item.from.toString())
                        return true;
                    return false;
                });
                if (foundOpenHours.length === 0)
                    continue;
                return KaToolsV1.date.setTime(foundOpenHours[0].from, curDate);
            }
            return null;
        }

        getOpenHoursStruct(date = null) {
            date = KaToolsV1.date.mkdate(date);
            let status = {
                status: null,
                open_till: null,
                opens: null
            }
        }

    },


    date: class {

        static MSEC_PER_SECOND = 1000;
        static MSEC_PER_DAY = 86400 * 1000;

        /**
         * Format unix like time
         *
         * Y-m-d H:i:s   => 2022-05-01 15:44:01
         *
         * @param format
         * @param date
         * @returns string
         */
        static date(format, date = null) {
            date = this.mkdate(date);
            return format
                .replace("Y", date.getFullYear())
                .replace("m", (date.getMonth() + 1).toString().padStart(2, '0'))
                .replace("d", date.getDate().toString().padStart(2, '0'))
                .replace("H", date.getHours().toString().padStart(2, '0'))
                .replace("i", date.getMinutes().toString().padStart(2, '0'))
                .replace("s", date.getSeconds().toString().padStart(2, '0'))
        }

        static strtodate(input) {
            let matches = input.match(/^([0-9]{4,4})-([0-9]{2,2})-([0-9]{2,2})$/);
            if (matches !== null) {
                return new Date(matches[1], matches[2], matches[3]);
            }
            throw `Cannot strtodate(${input})`;
        }


        /**
         *
         * @param date
         * @returns {Date}
         */
        static mkdate(date = null) {
            let ret = Array.from(arguments).map(date => {
                if (date === null)
                    return new Date();
                return new Date(date);
            });
            if (arguments.length === 1)
                return ret[0];
            return ret;
        }

        /**
         * Return the Midnight start of the day. Optional dayOffset to select next, previous days
         *
         * @param date
         * @param dayOffset
         * @returns {Date}
         */
        static midnight(dayOffset = 0, date = null) {
            if (typeof dayOffset !== "number")
                throw "Invalid dayOffset. Expected number found" + dayOffset;
            date = this.mkdate(date);
            let curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
            return new Date(+curDay + (this.MSEC_PER_DAY * dayOffset));
        }


        static offset(dayOffset = 0, date = null) {
            if (typeof dayOffset !== "number") {
                console.error("Invalid dayOffset");
                throw new Error("Invalid dayOffset. Expected number found" + dayOffset);
            }
            date = this.mkdate(date);
            return new Date(+date + (this.MSEC_PER_DAY * dayOffset));
        }

        /**
         * Return midnight of the last day specified in parameter 1 (0: Sunday, 1: Monday)
         *
         * @param day
         * @param date
         * @returns {Date}
         */
        static dayOfWeek(day = 0, date = null) {
            date = this.mkdate(date);

            for (let offset = 0; offset > -8; offset--) {
                let cur = this.midnight(offset, date);
                if (cur.getDay() === day)
                    return cur;
            }
        }

        /**
         * Return HHiiss String
         *
         * @param time
         * @returns {KaToolsV1.time}
         */
        static mkTime(time) {
            if (time instanceof Date)
                return new KaToolsV1.time(time.getHours(), time.getMinutes(), time.getSeconds());
            return KaToolsV1.time.create(time);
        }

        /**
         *
         * @param time
         * @param date
         * @returns {Date}
         */
        static setTime(time, date = null) {
            time = this.mkTime(time);
            date = this.mkdate(date);
            date.setHours(time.hour);
            date.setMinutes(time.minute);
            date.setSeconds(time.seconds);
            return date;
        }

        /**
         * Return true if the date in parameter 1 is a Time (Hour, Minute) between from and till
         *
         * @param date
         * @param from
         * @param till
         * @returns {boolean}
         */
        static isInTimeInterval(date = null, from = null, till = null) {
            let time = this.mkTime(this.mkdate(date));

            if (from !== null) {
                from = this.mkTime(from)
                if (time < from)
                    return false; // Before from
            }
            if (till !== null) {
                till = this.mkTime(till)
                if (time > till)
                    return false; // Before from
            }
            return true;
        }

        static getCalendar(startDate = null, weeks = 8) {
            startDate = this.mkdate(startDate);

            // Start on last Monday

            startDate = this.dayOfWeek(0, startDate);

            let lastDate = startDate;
            let weekArray : any = [{type: "month", date: startDate}];
            for (let weekIdx = 0; weekIdx < weeks; weekIdx++) {
                let curWeekArr = {type: "week", days: []};
                for (let dayIdx = 0; dayIdx < 7; dayIdx++) {
                    let curDate = this.offset(1, lastDate);
                    if (curDate.getMonth() !== lastDate.getMonth()) {
                        for (let shiftIdx = dayIdx; shiftIdx < 7; shiftIdx++)
                            curWeekArr.days.push(null);
                        weekArray.push(curWeekArr);
                        weekArray.push({type: "month", date: curDate});
                        curWeekArr = {type: "week", days: []};
                        for (let shiftIdx = 0; shiftIdx < dayIdx; shiftIdx++)
                            curWeekArr.days.push(null);
                    }
                    curWeekArr.days.push(curDate);
                    lastDate = curDate;
                }
                weekArray.push(curWeekArr);
            }
            return weekArray;
        }
    },

    time: class {

        public hour;
        public minute;
        public seconds;

        constructor(hour, minute, seconds) {
            this.hour = parseInt(hour);
            this.minute = parseInt(typeof minute === "undefined" ? 0 : minute)
            this.seconds = parseInt(typeof seconds === "undefined" ? 0 : seconds)
        }


        static create(timeString) {
            if (timeString instanceof KaToolsV1.time)
                return timeString;
            let hour, minute, seconds;
            [hour, minute, seconds] = timeString.split(":");
            return new this(hour, minute, seconds);
        }

        toString(format = "H:i:s") {
            return format
                .replace("H", this.hour.toString().padStart(2, 0))
                .replace("i", this.minute.toString().padStart(2, 0))
                .replace("s", this.seconds.toString().padStart(2, 0))

        }
    }
}
