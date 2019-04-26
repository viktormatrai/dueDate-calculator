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
   testIt.throws(() => index.dueDateCalculator('string', 1), 'Submission date should be a Date');
   testIt.throws(() => index.dueDateCalculator(1.1, 1), 'Submission date should be a Date');
   testIt.throws(() => index.dueDateCalculator(true, 1), 'Submission date should be a Date');
});

test('Ending on the same day', testIt=>{
   const dateOfSubmission = new Date(2019, 3, 24, 11,38,0,0);
   const turnaround = 2;

   const dueDate = index.dueDateCalculator(dateOfSubmission, turnaround);
   const expected = new Date(2019, 3, 26, 11,38,0,0);

   testIt.is(+dueDate, +expected);
});

test('Submission time on Friday, due date to Tuesday', testIs => {
    const dateOfSubmission = new Date(2019, 3, 26, 16, 0, 0, 0);
    const turnaround = 16;

    const dueDate = index.dueDateCalculator(dateOfSubmission, turnaround);
    const expected = new Date(2019, 3, 30, 10, 0, 0, 0);

    testIs.is(+dueDate, +expected)
});