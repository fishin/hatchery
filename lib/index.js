var Hoek = require('hoek');
var Pail = require('pail');
var Path = require('path');

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

internals.getLabTest = function (contents) {

    var result = {};
    var tests = {};
    try {
        tests = JSON.parse(contents);
    }
    catch (err) {
        console.log('could not parse contents');
        return null;
    }
    if (!tests.tests) {
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
//    console.log(JSON.stringify(result, 0, 4));
    return result;
};

internals.getTapTest = function (contents) {

    var result = {
        tests: {
            main: []
        },
        totalDuration: 0,
        totalTests: 0
    };
    var lines = contents.split('\n');
    //result.totalTests = parseInt(lines[0].split('..')[1]);
    var test = {
        err: '',
        title: ''
    };
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        //console.log(line);
        if (line.match('^ok') || line.match('^not ok')) {
            if (i !== 1) {
                // push previous test
                result.tests.main.push(test);
            }
            // reset test
            test = {
                err: '',
                title: ''
            };
            result.totalTests++;
            var lineParts = line.split(' ');
            var titleStart = 2;
            if (lineParts[0] === 'not') {
                //test.status = 'not ok';
                test.testNum = result.totalTests;
                // not ok start title one more element
                titleStart = 3;
            } else {
                test.err = false;
                //test.status = 'ok';
                test.testNum = result.totalTests;
            }
            for (var j = titleStart; j < lineParts.length; j++) {
                test.title += lineParts[j] + ' ';
            }
            test.title.trim();
        } else if (line.match('duration_ms:')) {
            test.duration = parseFloat(line.split('duration_ms: ')[1]);
            result.totalDuration += test.duration;
        } else if (line.match('^#')) {
            test.err += line.substr(1, line.length) + '\n';
            test.err.trim();
        }
    }
    // push last test
    result.tests.main.push(test);
    //console.log(JSON.stringify(result, 0, 4));
    return result;
};

exports.getTestResult = function () {

    var pail = new Pail(internals.Hatchery.settings);
    var artifacts = pail.getFiles(internals.Hatchery.settings.archive);
    for (var i = 0; i < artifacts.length; i++) {
        var artifact = artifacts[i];
        var ext = Path.extname(artifact);
        var contents;
        if (ext === '.lab') {
            contents = pail.getArtifact(internals.Hatchery.settings.archive, artifact);
            return internals.getLabTest(contents);
        }
        if (ext === '.tap') {
            contents = pail.getArtifact(internals.Hatchery.settings.archive, artifact);
            return internals.getTapTest(contents);
        }
    }
    console.log('no test found');
    return null;
};
