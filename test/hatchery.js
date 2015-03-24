var Code = require('code');
var Lab = require('lab');

var Hatchery = require('..');

var internals = {
    defaults: {
        dirPath: __dirname,
        archive: 'example'
    }
};

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var describe = lab.describe;
var it = lab.it;

describe('hatchery', function () {

    it('getTestResult none', function (done) {

        var hatchery = new Hatchery(internals.defaults);
        var result = hatchery.getTestResult('lab1.json');
        expect(result).to.not.exist();
        done();
    });

    it('getTestResult broke', function (done) {

        var hatchery = new Hatchery(internals.defaults);
        var result = hatchery.getTestResult('broke.json');
        expect(result).to.not.exist();
        done();
    });

    it('getTestResult', function (done) {

        var hatchery = new Hatchery(internals.defaults);
        var result = hatchery.getTestResult('lab.json');
        expect(result.totalTests).to.exist();
        expect(result.tests).to.exist();
        expect(result.coveragePercent).to.exist();
        expect(result.coverage).to.exist();
        expect(result.totalDuration).to.exist();
        expect(result.totalLeaks).to.exist();
        done();
    });
});
