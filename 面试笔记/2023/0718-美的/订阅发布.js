const eventMap = new Map();

function subscribe(eventLabel, callback) {
    if (!callback || !eventLabel) {
        return;
    }
    if (eventMap.has(eventLabel)) {
        let eventArr = eventMap.get(eventLabel);
        eventArr.push(callback);
        eventMap.set(eventLabel, eventArr);
    } else {
        eventMap.set(eventLabel, [callback]);
    }
}

function dispatch(eventLabel, data) {
    if (eventMap.has(eventLabel)) {
        let arr = eventMap.get(eventLabel);
        for (const callback of arr) {
            callback(data);
        }
    }
}