/* eslint-disable import/no-commonjs */
const baseConfig = require('./jest.config.js');

module.exports = {
  ...baseConfig,
  setupFilesAfterEnv: ['<rootDir>/app/util/test/testSetupView.tsx'],
  testTimeout: 30000,
  forceExit: true,
  maxWorkers: 1,
};
