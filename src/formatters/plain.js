import _ from 'lodash';

const stringify = (value) => {
  if (_.isBoolean(value) || _.isNumber(value)) {
    return value;
  }
  return !_.isObject(value) ? `'${value}'` : '[complex value]';
};

const plain = (arr) => {
  const result = arr.map((i) => {
    if (i.status === 'head') {
      return `${plain(i.ast)}`;
    }
    if (i.status === 'added') {
      return `Property '${i.key}' was added with value: ${stringify(i.value)}`;
    }
    if (i.status === 'removed') {
      return `Property '${i.key}' was removed`;
    }
    if (i.status === 'unchanged') {
      return '';
    }
    return `Property '${i.key}' was updated. From ${stringify(
      i.oldValue,
    )} to ${stringify(i.newValue)}`;
  });

  return result.filter((i) => /\S/.test(i)).join('\n');
};
export default plain;
