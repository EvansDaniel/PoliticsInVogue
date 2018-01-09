// TODO: figure out a better way to do this
const API_URLS = require('../../../src/shared/api-urls');
const routeUtils = require('../../utils/route-utils');

const SubscriberBootstrap = function (app) {
    const Subscriber = require('./Subscriber');
    const SubscriberDataService = require('./SubscriberDataService')(Subscriber);
    const SubscriberRoutes = require('./SubscriberRoutes')(SubscriberDataService);

    // define app.get/post routes here
};

module.exports = SubscriberBootstrap;

