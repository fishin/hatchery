var Hoek = require('hoek');
var Pail = require('pail');

var internals = {
    defaults: {
        dirPath: '/tmp/hatchery'
    }
};

module.exports = internals.Hatchery = function (options) {

    var settings = Hoek.applyToDefaults(internals.defaults, options);
    internals.Hatchery.settings = settings;
    this.settings = settings;
    this.getTestResult = exports.getTestResult;
};

exports.getTestResult = function (dir, file) {

    var pail = new Pail(internals.Hatchery.settings);
    console.log(pail);
    var contents = pail.getArtifact(dir, file);
    var result = {};
    if (contents) {
        var tests = JSON.parse(contents);
        result.totalTests = 0;
        result.coveragePercent = Math.round(tests.coverage.percent * 100) / 100;
        result.coverage = tests.coverage;
        result.totalDuration = tests.duration;
        result.totalLeaks = tests.leaks.length;
        result.tests = tests.tests;
        for (var key in tests.tests) {
            result.totalTests += tests.tests[key].length; 
        }
        //console.log('totalTests: ' + result.totalTests);
        //console.log(JSON.stringify(tests, null, 4));
        return result;
    } else {
        return null;
    }
};
