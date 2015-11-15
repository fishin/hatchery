'use strict';

const Code = require('code');
const Lab = require('lab');

const Hatchery = require('..');

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.describe;
const it = lab.it;

describe('hatchery', () => {

    it('getTestResult none', (done) => {

        const options = {
            dirPath: __dirname + '/examples',
            archive: 'none'
        };
        const hatchery = new Hatchery(options);
        const result = hatchery.getTestResult();
        expect(result).to.not.exist();
        done();
    });

    it('getTestResult null', (done) => {

        const options = {
            dirPath: __dirname + '/examples',
            archive: 'null'
        };
        const hatchery = new Hatchery(options);
        const result = hatchery.getTestResult();
        expect(result).to.not.exist();
        done();
    });

    it('getTestResult invalid', (done) => {

        const options = {
            dirPath: __dirname + '/examples',
            archive: 'invalid'
        };
        const hatchery = new Hatchery(options);
        const result = hatchery.getTestResult();
        expect(result).to.not.exist();
        done();
    });

    it('getTestResult lab broke', (done) => {

        const options = {
            dirPath: __dirname + '/examples',
            archive: 'broke'
        };
        const hatchery = new Hatchery(options);
        const result = hatchery.getTestResult();
        expect(result).to.not.exist();
        done();
    });

    it('getTestResult lab missing tests', (done) => {

        const options = {
            dirPath: __dirname + '/examples',
            archive: 'missing'
        };
        const hatchery = new Hatchery(options);
        const result = hatchery.getTestResult();
        expect(result).to.not.exist();
        done();
    });

    it('getTestResult lab', (done) => {

        const options = {
            dirPath: __dirname + '/examples',
            archive: 'lab'
        };
        const hatchery = new Hatchery(options);
        const result = hatchery.getTestResult();
        expect(result.totalTests).to.exist();
        expect(result.tests).to.exist();
        expect(result.coveragePercent).to.exist();
        expect(result.coverage).to.exist();
        expect(result.totalDuration).to.exist();
        expect(result.totalLeaks).to.exist();
        done();
    });

    it('getTestResult tap', (done) => {

        const options = {
            dirPath: __dirname + '/examples',
            archive: 'tap'
        };
        const hatchery = new Hatchery(options);
        const result = hatchery.getTestResult();
        expect(result.totalTests).to.exist();
        expect(result.tests).to.exist();
        expect(result.totalDuration).to.exist();
        done();
    });
});
