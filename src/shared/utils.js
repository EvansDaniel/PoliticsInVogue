const waitBeforeCall = (function () {
    let timeoutId = null;

    return function (func, timeToWait) {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(func, timeToWait);
    }
})();

export {
    waitBeforeCall
};