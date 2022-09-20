import { suite, test } from 'mocha';
import { expect } from 'chai';

suite('Basic tests', async () => {
    test('Some math', async () => {
        expect(2 + 2).to.eql(4);
    });
});
