const serviceUtils = require('../../utils/service-utils');

const UserDataService = function (User) {
    return {
        // cb should have err, savedDocument, rowsAffected params
        create: function (userData, cb) {
            // TODO: look up validation stuff for mongoose
            const newUser = new User(userData);
            newUser.save(cb);
        },

        update: function (userData, cb) {
            console.log(userData);
            // TODO: check if _id is present
            User.update({ _id: userData._id }, userData,
                function (err, raw) {
                console.log('Mongo raw', raw);
                return cb(err, raw);
            });
        },

        delete: function (_id, cb) {
            return false;
        },
    }
};

module.exports = UserDataService;

