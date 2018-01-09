(function () {

    module.exports = {
        errorLogger: function (err, cb) {
            if(err) console.log(err);
            return cb(err);
        }
    }

})();