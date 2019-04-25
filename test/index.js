const test = require('ava');
const dueDateCalculator = require('./index');

test('Turnaround type is not an integer', testIt =>{
   const day = new Date();
   testIt.throws(() => dueDateCalculator(day, 'wrong type'), 'Turnaround type should be an integer');
   testIt.throws(() => dueDateCalculator(day, true), 'Turnaround type should be an integer');
   testIt.throws(() => dueDateCalculator(day, {Key: 'value'}), 'Turnaround type should be an integer');
   testIt.throws(() => dueDateCalculator(day, 0.1), 'Turnaround type should be an integer');
})