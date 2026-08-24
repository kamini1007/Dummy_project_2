// Demo app - the point of this project is its outdated package.json, not
// this file. lodash 4.17.15 has a known prototype pollution vulnerability
// (CVE-2020-8203); minimist 0.0.8 has a known prototype pollution /
// argument injection issue (CVE-2020-7598).
const _ = require('lodash');
const argv = require('minimist')(process.argv.slice(2));

console.log('Demo frontend app running with args:', argv);
console.log('lodash version in use:', require('lodash/package.json').version);
