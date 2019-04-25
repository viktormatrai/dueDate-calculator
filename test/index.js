const test = require('ava');
const index = require('../index');


test('Turnaround type is not an integer', testIt =>{
   const day = new Date();
   testIt.throws(() => index.dueDateCalculator(day, 'wrong type'), 'Turnaround type should be an integer');
   testIt.throws(() => index.dueDateCalculator(day, true), 'Turnaround type should be an integer');
   testIt.throws(() => index.dueDateCalculator(day, {Key: 'value'}), 'Turnaround type should be an integer');
   testIt.throws(() => index.dueDateCalculator(day, 0.1), 'Turnaround type should be an integer');
});

test('Wrong type of submission date', testIt=> {
   testIt.throws(() => index.dueDateCalculator('wrong type', 1), 'Submission date should be a Date');
   testIt.throws(() => index.dueDateCalculator(1.1, 1), 'Submission date should be a Date');
   testIt.throws(() => index.dueDateCalculator(true, 1), 'Submission date should be a Date');
});

test('Ending on the same day', testIt=>{
   const dateOfSumbmission = new Date(2019, 4, 25, 19,38,0,0);
   const turnaround = 1;

   const dueDate = index.dueDateCalculator(dateOfSumbmission, turnaround);
   const expected = new Date(2019, 4, 26, 19,38,0,0);

   testIt.is(+dueDate, +expected);
});