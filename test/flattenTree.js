const test = require('ava');
const flattenTree = require('../lib/flattenTree');
const answers = require('../examples/answers.json');
const expectedOutput = require('../examples/expectedOutput.json');
const questionSet = require('../examples/questionset.json');


test('Normalize a simple example', t => {
  const sample = [{
    "id": "question1",
    "type": "text",
    "question": "Please answer this question"
  }];

  const output = [{
    "id": "question1",
    "type": "text",
    "text": "Please answer this question"
  }];

  const result = flattenTree(sample, {});
  t.deepEqual(result, output);
});

test('Normalize a type example', t => {
  const sample = [{
    "id": "question2",
    "type": "integer",
    "question": "Please answer this other question"
  }];

  const output = [{
    "id": "question2",
    "type": "number",
    "text": "Please answer this other question"
  }];

  const result = flattenTree(sample, {});
  t.deepEqual(result, output);
});

test('flattens correctly the provided examples', t => {
  const result = flattenTree(questionSet, answers);
  t.deepEqual(result, expectedOutput);
});
