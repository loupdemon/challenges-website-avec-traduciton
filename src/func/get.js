const get = async function (url = "/", callback = function (r) {
    console.log(r)
}, errorCallback = function (e) {
    console.warn(e)
}, debug = false) {

    if (typeof window.requestCache[url] !== "undefined") {
        if (window.requestCache[url]["timestamp"] > Date.now() - (1000 * 60 * 15) + (1000 * 60 * 60 * window.timezoneoffset) && window.requestCache[url]["body"] !== "") {
            if (window.requestCache[url]["code"] === 200) {
                callback(window.requestCache[url]["body"]);
            } else {
                errorCallback(window.requestCache[url]["body"], window.requestCache[url]["code"])
            }
            return true
        } else {
            console.log("differnce");
            console.log(window.requestCache[url]["timestamp"]);
            console.log(Date.now() - (1000 * 60 * 15) + (1000 * 60 * 60 * window.timezoneoffset));
        }
    }

    let request = await fetch(url)

    if (debug) {
        console.log(request);
    }

    let result = await request.text();

    try {
        result = JSON.parse(result);
    } catch (e) {
        if (debug) {
            console.warn(e + " in get(" + url + ")");
        }
    } finally {
        if (debug) {
            console.log(result);
        }

    }

    let timestamp = Date.now();

    if (request.status !== 200) {
        timestamp = (timestamp - 1000 * 60 * 13) + (1000 * 60 * 60 * window.timezoneoffset);
    }

    window.requestCache[url] = {
        "timestamp": timestamp,
        "code": request.status,
        "body": result
    }

    if (request.status === 200) {
        callback(result);
    } else {
        errorCallback(result, request.status)
    }
}

export default get;