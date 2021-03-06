const HttpError = require('http-error');

(function () {

    // Returns an Error() for Bad Request if required query params are not set
    // Takes req.query object and requiredParams of the form
    // { queryField: 'Message displayed describing field if invalid queryField given'}
    const checkRequiredQueryParams = function (queryObj, requiredParams) {
        for (let field in requiredParams) {
            if (requiredParams.hasOwnProperty(field) &&
                !Object.prototype.hasOwnProperty.call(queryObj, field)) {
                return new HttpError.BadRequest({
                    requiredQueryParameters: requiredParams
                });
            }
        }
        return null;
    };

    module.exports = {
        errorLogger: function (err, cb) {
            if (err) console.log(err);
            return cb(err);
        },
        checkRequiredQueryParams: checkRequiredQueryParams,
    }

})();