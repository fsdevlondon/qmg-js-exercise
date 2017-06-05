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
  const questions = _.result(_.find(question.groups, (obj) => (obj.trigger === answer)), "questions");

  return _.flatMapDeep(questions, getAnswer) // TODO: Needs refactor code with orginal call
};

// Find if has groups, that mean recursively
const getAnswer = (question) => { // TODO: Needs answers now
  return question.groups
    ? [
        // Print normalized output
        normalizedOutput(question),
        // Find Position of Trigger Answer
        getTriggerAnswer(question, answers)
      ]
    : normalizedOutput(question);
};

module.exports = (questionset, answers) => {
  const data = _.flatMapDeep(questionset, getAnswer); // TODO: Curry, needs answers
  return data;
};
