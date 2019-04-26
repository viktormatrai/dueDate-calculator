Calculating due dates with a given turnaround time

**You can install it from npm as follows:**

$ npm i duedatecalc

**Example code:**

const ddc = require('duedatecalc');

const dateOfSubmission = new Date(2019,3,25,22,9,0,0);
const turnaround = 16;

console.log(ddc.dueDateCalculator(dateOfSubmission, turnaround))