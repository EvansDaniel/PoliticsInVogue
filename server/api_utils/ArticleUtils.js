module.exports = (function () {
    "use strict";

    return {
        timeToReadInMin: function (text) {
            const averageWordsPerMin = 250;
            const numWordsInArticle = text.split(' ').length;
            return Math.ceil(numWordsInArticle / averageWordsPerMin)
                || 1;
        }
    }

})();