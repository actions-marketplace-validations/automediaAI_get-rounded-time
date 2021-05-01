const core = require("@actions/core");
var moment = require('moment');

function action () {
    try {
        const utcOffset = core.getInput('utcOffset', { required: false });
        const format = core.getInput('format', { required: false });
        const interval = core.getInput('interval', { required: false });
        const intervalType = core.getInput('intervalType', { required: false });
        let method = core.getInput('method', { required: false });

        let time = moment().utcOffset(utcOffset);

        if (interval && intervalType && +interval > 0) {
            if (!method){
                method = 'ceil';
            }
            const momentDuration = moment.duration(parseInt(interval), intervalType);
            time = moment(Math[method]((+time) / (+momentDuration)) * (+momentDuration));
        }

        core.setOutput("time", time.toISOString());
        core.setOutput("ISOTime", time.toISOString());
        core.setOutput("readableTime", time.toString());
        core.setOutput("formattedTime", time.format(format));

        let [year, month, day, hour, minute, second, millisecond] = time.toArray();
        month = String(Number(month) + 1);
        core.setOutput("year", year)
        core.setOutput("month", month)
        core.setOutput("day", day)
        core.setOutput("hour", hour)
        core.setOutput("minute", minute)
        core.setOutput("second", second)
        core.setOutput("millisecond", millisecond)
    } catch (error) {
        core.setFailed(error.message);
    }
}

module.exports = action;
