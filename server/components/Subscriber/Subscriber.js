const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const SubscriberSchema = new Schema({
    email: {
        type: String,
        require: true,
        index: {unique: true},
        trim: true
    },
    lastEmail: Date,
    // TODO: look up enums in mongoose
    emailFrequency: Number
}, {
    timestamps: true
});

const Subscriber = Mongoose.model('Subscriber', SubscriberSchema);

module.exports = Subscriber;

