var Code = require('code');
var Lab = require('lab');

var Hatchery = require('..');

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var describe = lab.describe;
var it = lab.it;

describe('hatchery', function () {

    it('getTestResult none', function (done) {

        var options = {
            dirPath: __dirname + '/examples',
            archive: 'none'
        };
        var hatchery = new Hatchery(options);
        var result = hatchery.getTestResult();
        expect(result).to.not.exist();
        done();
    });

    it('getTestResult invalid', function (done) {

        var options = {
            dirPath: __dirname + '/examples',
            archive: 'invalid'
        };
        var hatchery = new Hatchery(options);
        var result = hatchery.getTestResult();
        expect(result).to.not.exist();
        done();
    });

    it('getTestResult lab broke', function (done) {

        var options = {
            dirPath: __dirname + '/examples',
            archive: 'broke'
        };
        var hatchery = new Hatchery(options);
        var result = hatchery.getTestResult();
        expect(result).to.not.exist();
        done();
    });

    it('getTestResult lab missing tests', function (done) {

        var options = {
            dirPath: __dirname + '/examples',
            archive: 'missing'
        };
        var hatchery = new Hatchery(options);
        var result = hatchery.getTestResult();
        expect(result).to.not.exist();
        done();
    });

    it('getTestResult lab', function (done) {

        var options = {
            dirPath: __dirname + '/examples',
            archive: 'lab'
        };
        var hatchery = new Hatchery(options);
        var result = hatchery.getTestResult();
        expect(result.totalTests).to.exist();
        expect(result.tests).to.exist();
        expect(result.coveragePercent).to.exist();
        expect(result.coverage).to.exist();
        expect(result.totalDuration).to.exist();
        expect(result.totalLeaks).to.exist();
        done();
    });

    it('getTestResult tap', function (done) {

        var options = {
            dirPath: __dirname + '/examples',
            archive: 'tap'
        };
        var hatchery = new Hatchery(options);
        var result = hatchery.getTestResult();
        expect(result.totalTests).to.exist();
        expect(result.tests).to.exist();
        expect(result.totalDuration).to.exist();
        done();
    });
});
