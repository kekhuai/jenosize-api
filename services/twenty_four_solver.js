const includes = require('lodash/includes');
const isEmpty = require('lodash/isEmpty');
const isEqual = require('lodash/isEqual');
const map = require('lodash/map');
const size = require('lodash/size');
const uniqWith = require('lodash/uniqWith');
const validator = require('validator');

function combinations(array) {
  let results = [];
  for (let i = 0; size(array) - 1 > i; ++i) {
    for (let j = i + 1; size(array) > j; ++j) {
      results.push([array[i], array[j]]);
    }
  }
  return results;
}

function combineTwo(a, b) {
  let result = [a + b, a * b];
  let expr = [[0, '+', 1], [0, '*', 1]];
  if (b > a) {
    result.push(b - a);
    expr.push([1, '-', 0]);
  } else {
    result.push(a - b);
    expr.push([0, '-', 1]);
  }
  if (0 !== b) {
    result.push(a / b);
    expr.push([0, '/', 1]);
  }
  if (0 !== a) {
    result.push(b / a);
    expr.push([1, '/', 0]);
  }
  return { result, expr };
}

function convertExprToString(a, b, expr) {
  const temp = [a, b];
  const result = `(${temp[expr[0]].toString()})${expr[1].toString()}(${temp[expr[2]].toString()})`;
  return result;
}

function solve(numbers, goal=24, expr=[]) {
  if (isEmpty(expr)) {
    expr = map(numbers, (number) => number.toString());
  }
  if (1 === size(numbers)) {
    if (goal === numbers[0]) {
      return numbers[0];
    } else {
      return false;
    }
  }
  if (2 === size(numbers)) {
    const { result: answers, expr: answerExps } = combineTwo(numbers[0], numbers[1]);
    for (const [i, answer] of answers.entries()) {
      if (goal === answer) {
        return convertExprToString(expr[0], expr[1], answerExps[i]);
      }
    }
    return false;
  }

  const pairs = uniqWith(combinations(numbers), isEqual);
  for (const pair of pairs) {
    const { result: possibleValues, expr: possibleExpr } = combineTwo(...pair);
    for (const [counter, value] of possibleValues.entries()) {
      const expression = possibleExpr[counter];
      let aIndex = numbers.indexOf(pair[0]);
      let bIndex = numbers.indexOf(pair[1]);
      if (aIndex === bIndex) {
        bIndex = numbers.indexOf(pair[1], aIndex + 1);
      }

      const exprString = convertExprToString(expr[aIndex], expr[bIndex], expression);
      const newList = [...numbers];
      const newExpr = [...expr];

      aIndex = newList.indexOf(pair[0]);
      newList.splice(aIndex, 1);
      bIndex = newList.indexOf(pair[1]);
      newList.splice(bIndex, 1);
      newList.push(value);

      newExpr.splice(aIndex, 1);
      newExpr.splice(bIndex, 1);
      newExpr.push(exprString);
      const result = solve(newList, goal, newExpr);
      if (result) {
        return removeRedundantBrackets(result);
      }
      continue;
    }
  }
}

function removeRedundantBrackets(expr) {
  const stack = [];
  const indices = [];
  for (let i = 0; size(expr) > i; ++i) {
    const ch = expr.charAt(i);
    if ('(' === ch) {
      stack.push(i);
    }
    if (')' === ch) {
      const lastBracketIndex = stack.pop();
      const enclosed = expr.substring(lastBracketIndex + 1, i);
      if (validator.isNumeric(enclosed)) {
        indices.push(i);
        indices.push(lastBracketIndex);
      }
    }
  }
  const results = [];
  for (let idx = 0; size(expr) > idx; ++idx) {
    const char = expr.charAt(idx);
    if (!includes(indices, idx)) {
      results.push(char);
    }
  }
  return results.join('');
}

module.exports = { solve };
