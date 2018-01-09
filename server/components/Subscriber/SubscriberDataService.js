const serviceUtils = require('../../utils/service-utils');

const SubscriberDataService = function (Subscriber) {
    return {
        create: function (subscriberData, cb) {
            // TODO: look up validation stuff for mongoose
            const newSubscriber = new Subscriber(subscriberData);
            console.log(subscriberData);
            newSubscriber.save(function (err) {
                serviceUtils.errorLogger(err,cb);
            });
        },

        update: function (subscriberData, cb) {
            // TODO: check if _id is present
            Subscriber.update({ _id: subscriberData._id }, subscriberData,
                function (err, raw) {
                console.log('Mongo raw', raw);
                serviceUtils.errorLogger(err, cb);
            });
        },

        delete: function (id, cb) {
            //serviceUtils.errorLogger(err, cb);
            return false;
        },
    }
};

module.exports = SubscriberDataService;

