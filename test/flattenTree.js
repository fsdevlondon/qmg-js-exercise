const test = require('ava');
const flattenTree = require('../lib/flattenTree');
const answers = require('../examples/answers.json')
const expectedOutput = require('../examples/expectedOutput.json')
const questionSet = require('../examples/questionset.json')


test('flattens correctly the provided examples', t => {
  const result = flattenTree(questionSet, answers)
  t.deepEqual(result, expectedOutput)
});
