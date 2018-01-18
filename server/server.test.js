const assert = require('chai').assert,
    sinon = require('sinon');

describe('Server', function () {

    it('starts without crashing', function () {
        require('./server');
    });
});