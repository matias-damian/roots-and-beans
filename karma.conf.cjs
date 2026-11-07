module.exports = function(config){
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    files: ['.karma/tests.js'],
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'lcovonly', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-dev-shm-usage']
      }
    },
    singleRun: true,
    autoWatch: false,
    client: { jasmine: { random: false } }
  });
};
