const test = require('ava');
const dueDateCalculator = require('./index');

test('Turnaround type is not an integer', testIt =>{
   const day = new Date();
   testIt.throws(() => dueDateCalculator(day, 'wrong type'), 'Turnaround type should be an integer');
   testIt.throws(() => dueDateCalculator(day, true), 'Turnaround type should be an integer');
   testIt.throws(() => dueDateCalculator(day, {Key: 'value'}), 'Turnaround type should be an integer');
   testIt.throws(() => dueDateCalculator(day, 0.1), 'Turnaround type should be an integer');
});

test('Wrong type of submission date', testIt=> {
   testIt.throws(() => dueDateCalculator('wrong type', 1), 'Submission date should be a Date');
   testIt.throws(() => dueDateCalculator(1.1, 1), 'Submission date should be a Date');
   testIt.throws(() => dueDateCalculator(true, 1), 'Submission date should be a Date');
});

test('Ending on the same day', testIt=>{
   const dateOfSumbmission = new Date(2019, 4, 25, 19,38,0,0);
   const turnaround = 1;

   const dueDate = dueDateCalculator(dateOfSumbmission, turnaround);
   const expected = new Date(2019, 4, 25, 20,38,0,0);

   testIt.is(dueDate, expected);
});