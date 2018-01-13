const serviceUtils = require('../../utils/service-utils');

const SubscriberDataService = function (Subscriber) {
    return {
        create: function (subscriberData, cb) {
            // TODO: look up validation stuff for mongoose
            const newSubscriber = new Subscriber(subscriberData);
            console.log(subscriberData);
            newSubscriber.save(cb);
        },

        update: function (subscriberData, cb) {
            // TODO: check if _id is present
            Subscriber.update({ _id: subscriberData._id }, subscriberData,
                function (err, raw) {
                console.log('Mongo raw', raw);
                return cb(err, raw);
            });
        },

        delete: function (id, cb) {
            return false;
        },
    }
};

module.exports = SubscriberDataService;

