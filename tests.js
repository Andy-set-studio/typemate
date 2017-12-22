var jsdom = require('jsdom-global')
var TypeMate = require('./src/typemate');
var assert = require('assert');
var _ = require('lodash');
var fs = require("fs");

before(function () {
    this.jsdom = require('jsdom-global')()
})

after(function () {
    this.jsdom()
})

describe('TypeMate tests', function () {
    var tests = JSON.parse(
        fs.readFileSync(__dirname + "/tests.json")
    );

    _.each(tests, function ({parent, settings, init, apply, reset}, description) {
        it(description, function () {
            document.body.innerHTML = init;

            if (parent) {
                var typeMateInstance = new TypeMate(document.querySelector(parent), settings);
            } else {
                var typeMateInstance = new TypeMate(undefined, settings);
            }

            typeMateInstance.apply();
            assert.equal(document.body.innerHTML, apply || init);

            typeMateInstance.reset();
            assert.equal(document.body.innerHTML, reset || init);
        });
    });
})
