// Demo app - the point of this project is its outdated package.json, not
// this file. axios 0.21.0 has a known SSRF / proxy-bypass vulnerability
// (CVE-2020-28168); express 4.16.0 is old enough to carry several
// dependency-chain advisories of its own.
const express = require('express');
const axios = require('axios');

const app = express();
app.get('/health', (req, res) => res.json({ status: 'UP' }));

console.log('Demo API gateway configured (not actually started)');
