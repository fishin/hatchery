var Code = require('code');
var Lab = require('lab');

var Hatchery = require('../lib');

var internals = {
    defaults: {
        dirPath: 'test'
    }
};

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var describe = lab.describe;
var it = lab.it;

describe('hatchery', function () {

    it('getTestResult none', function (done) {

        var hatchery = new Hatchery(internals.defaults);
        var result = hatchery.getTestResult('example', 'lab1.json');
        expect(result).to.not.exist();
        done();
    });

    it('getTestResult', function (done) {

        var hatchery = new Hatchery(internals.defaults);
        var result = hatchery.getTestResult('example', 'lab.json');
        expect(result.totalTests).to.exist();
        expect(result.tests).to.exist();
        expect(result.coveragePercent).to.exist();
        expect(result.coverage).to.exist();
        expect(result.totalDuration).to.exist();
        expect(result.totalLeaks).to.exist();
        done();
    });
});
