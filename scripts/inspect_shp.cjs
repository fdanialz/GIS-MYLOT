const fs = require('fs');
const path = require('path');
globalThis.self = globalThis;
const shp = require('shpjs');

console.log('shp keys:', Object.keys(shp));
console.log('shp default type:', typeof shp.default, typeof shp);
if (typeof shp === 'function') {
  console.log('shp is function');
}
