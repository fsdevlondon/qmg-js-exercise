const _ = require('lodash');

/*
  Default Type Values - HashMap
*/
const typeValues = {
  text: "text",
  integer: "number",
  yesno: "yesno"
};

/*
  Minimum Unit of Structure Data Output
*/
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

/*
  Curried Function to filter data
 */
const filterData = _.curry((filter, data) => {
  return _.find(data, filter);
});

/*
 Curried Function to find and return a property
 */
const findProperty = _.curry((property, data) => {
  return _.result(data, property);
});

/*
 Curried Function to map an Array
 */
const mapData = _.curry((fnc, data) => {
  return _.map(data, fnc);
});

/*
 Function to filter the trigger that match the answer
 */
const filterTrigger = (answer) => (obj) => (obj.trigger === answer);

/*
 Function to update the property id with the new value of:
 {Father Id}-{Answer of Trigger}-{Current Id}
 */
const updatePropertyId = (id, answer) => (qtn) => {
  qtn["id"] = `${id}-${answer}-${qtn["id"]}`;
  return qtn;
};

/*
  Call recursively flattenTree after running a flow of steps in the questions group.
  The flow: It chains one answer to the other,
  - Filter the data with a trigger that matches
  - Return the questions property object
  - Loop the questions updating the property Id
*/
const getTriggerAnswer = (question, answers) => {
  const { id } = question,
        answer = answers[id];

  const questions = _.flow(
    filterData(filterTrigger(answer)),
    findProperty("questions"),
    mapData(updatePropertyId(id, answer))
  )(question.groups)

  return flattenTree(questions, answers);
};

/*
 Returns the output of a question.
 When a question has groups go in deep.
*/
const getOutput = (answers) => (question) => {
  return question.groups
    ? [
        normalizedOutput(question), // Print normalized output
        getTriggerAnswer(question, answers) // Find Position of Trigger Answer
      ]
    : normalizedOutput(question); // Print normalized output
};

/*
  Main Function of the Flatten Tree
*/
const flattenTree = (questionset, answers) => {
  return _.flatMapDeep(questionset, getOutput(answers));
};

module.exports = flattenTree;
