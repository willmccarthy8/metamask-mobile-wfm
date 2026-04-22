// @ts-nocheck - TODO: Add proper types as part of ongoing JS→TS migration
/* eslint-disable import/no-commonjs, import/no-nodejs-modules */
const path = require('path');

module.exports = {
  process(_, filename) {
    const assetFilename = JSON.stringify(path.basename(filename));

    return {
      code: `module.exports = ${assetFilename};`,
    };
  },
};
