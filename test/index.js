const test = require('ava');
const dd = require('../index');

test('wrong submit date type', t => {
    t.throws(() => dd.dueDateCalculator('string', 0),
        'Submit date must be instance of Date');
    t.throws(() => dd.dueDateCalculator(123, 0),
        'Submit date must be instance of Date');
    t.throws(() => dd.dueDateCalculator(false, 0),
        'Submit date must be instance of Date')
});

test('wrong turnaround type', t => {
    const d = new Date();

    t.throws(() => dd.dueDateCalculator(d, 'string'), 'Turnaround must be integer');
    t.throws(() => dd.dueDateCalculator(d, false), 'Turnaround must be integer');
    t.throws(() => dd.dueDateCalculator(d, { a: 'b' }),
        'Turnaround must be integer');
    t.throws(() => dd.dueDateCalculator(d, 1.23), 'Turnaround must be integer')
});

test('same day ending', t => {
    const submitDate = new Date(2016, 10, 24, 12, 40, 0, 0);
    const turnaround = 2;

    const due = dd.dueDateCalculator(submitDate, turnaround);
    const exp = new Date(2016, 10, 24, 14, 40, 0, 0);

    t.is(+due, +exp)
});

test('just barely not same day ending', t => {
    const submitDate = new Date(2016, 10, 24, 16, 10, 0, 0);
    const turnaround = 1;

    const due = dd.dueDateCalculator(submitDate, turnaround);
    const exp = new Date(2016, 10, 25, 9, 10, 0, 0);

    t.is(+due, +exp)
});

test('between two working days', t => {
    const submitDate = new Date(2016, 10, 24, 12, 40, 0, 0);
    const turnaround = 9;

    const due = dd.dueDateCalculator(submitDate, turnaround);
    const exp = new Date(2016, 10, 25, 13, 40, 0, 0);

    t.is(+due, +exp)
});

test('friday to monday', t => {
    const submitDate = new Date(2016, 10, 25, 12, 40, 0, 0);
    const turnaround = 10;

    const due = dd.dueDateCalculator(submitDate, turnaround);
    const exp = new Date(2016, 10, 28, 14, 40, 0, 0);

    t.is(+due, +exp)
});

test('multiple weeks', t => {
    const submitDate = new Date(2016, 10, 24, 12, 40, 0, 0);
    const turnaround = 16 * 8 + 3;

    const due = dd.dueDateCalculator(submitDate, turnaround)
    const exp = new Date(2016, 11, 16, 15, 40, 0, 0);

    t.is(+due, +exp)
});

test('end of day ending', t => {
    const submitDate = new Date(2016, 11, 16, 12, 0, 0, 0);
    const turnaround = 5

    const due = dd.dueDateCalculator(submitDate, turnaround);
    const exp = new Date(2016, 11, 16, 17, 0, 0, 0);

    t.is(+due, +exp)
});