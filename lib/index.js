var Hoek = require('hoek');
var Pail = require('pail');

var internals = {
    defaults: {
        dirPath: '/tmp/hatchery',
        archive: 'archive'
    }
};

module.exports = internals.Hatchery = function (options) {

    var settings = Hoek.applyToDefaults(internals.defaults, options);
    internals.Hatchery.settings = settings;
    this.settings = settings;
    this.getTestResult = exports.getTestResult;
};

exports.getTestResult = function (file) {

    var pail = new Pail(internals.Hatchery.settings);
    var contents = pail.getArtifact(internals.Hatchery.settings.archive, file);
    var result = {};
    var tests = {};
    try {
        tests = JSON.parse(contents);
    }
    catch (err) {
        console.log('could not parse contents');
        return null;
    }
    if (!tests) {
        return null;
    }
    result.totalTests = 0;
    result.coveragePercent = Math.round(tests.coverage.percent * 100) / 100;
    result.coverage = tests.coverage;
    result.totalDuration = tests.duration;
    result.totalLeaks = tests.leaks.length;
    result.tests = tests.tests;
    for (var key in tests.tests) {
        // add counter for each test
        for (var i = 0; i < tests.tests[key].length; i++) {
            result.totalTests++;
            result.tests[key][i].testNum = result.totalTests;
        }
    }
    return result;
};
