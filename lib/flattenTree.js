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
const normalizeAnswer = (question) => {
  const {
    id,
    type,
    question: text
  } = question

  return {
    id,
    type: typeValues[type],
    text
  }
};

const getAnswer = (question) => {
  return
};

module.exports = (questionset, answers) => {
  const data = _.map(questionset, normalizeAnswer);
  return data
};
