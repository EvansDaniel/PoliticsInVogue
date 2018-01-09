const serviceUtils = require('../../utils/service-utils');

const UserDataService = function (User) {
    return {
        create: function (userData, cb) {
            // TODO: look up validation stuff for mongoose
            const newUser = new User(userData);
            console.log(userData);
            newUser.save(function (err) {
                serviceUtils.errorLogger(err,cb);
            });
        },

        update: function (userData, cb) {
            // TODO: check if _id is present
            User.update({ _id: userData._id }, userData,
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

module.exports = UserDataService;

