export default function msToTime(durationInMs) {
    var minutes = Math.floor(durationInMs / 60000);
    var seconds = ((durationInMs % 60000) / 1000).toFixed(0);

    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
};