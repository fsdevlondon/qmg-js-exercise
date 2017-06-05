const _ = require('lodash');
const fp = require('lodash/fp');

// Default Type Values HashMap
const typeValues = {
  text: "text",
  integer: "number",
  yesno: "yesno"
};

// Unit of Structure Data Output
// Return minimum Default structure
const normalizedOutput = (question) => {
  const {
    id,
    type,
    question: text
  } = question;

  return {
    id,
    type: typeValues[type],
    text
  };
};

// Find Position of Trigger Answer and recursive call
const getTriggerAnswer = (question, answers) => {
  const answer = answers[question.id];
  const questions = _.map((_.result(_.find(question.groups, (obj) => (obj.trigger === answer)), "questions")),
    (qtn) => {
      qtn["id"] = `${question.id}-${answer}-${qtn["id"]}`;
      return qtn;
    });

  return flattenTree(questions, answers);
};

// Find if has groups, that mean recursively
const getAnswer = (answers) => (question) => {
  return question.groups
    ? [
        normalizedOutput(question), // Print normalized output
        getTriggerAnswer(question, answers) // Find Position of Trigger Answer
      ]
    : normalizedOutput(question);
};

const flattenTree = (questionset, answers) => {
  const data = _.flatMapDeep(questionset, getAnswer(answers));
  return data;
};

module.exports = flattenTree;
