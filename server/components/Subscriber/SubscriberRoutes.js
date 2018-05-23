const routeUtils = require('../../utils/route-utils');

const SubscriberRoutes = function (SubscriberDataService) {

    const postCreateSubscriberHandle = function (req, res, next) {
        routeUtils.debuggingHelper(req, res, next, function (req, res, next) {
            SubscriberDataService.create(req.body.data, function (err, savedSubscriber, rowsAffected) {
                if (err) {
                    next(err);
                }

                if (!savedSubscriber) {
                    console.log(savedSubscriber);
                }

                return res.json(savedSubscriber);
            });
        });
    };

    return {
        postCreateSubscriberHandle: postCreateSubscriberHandle
    };
};

module.exports = SubscriberRoutes;

