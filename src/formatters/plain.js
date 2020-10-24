import _ from 'lodash';

const stringify = (value) => {
  if (_.isBoolean(value) || _.isNumber(value)) {
    return value;
  }
  return !_.isObject(value) ? `'${value}'` : '[complex value]';
};

const plain = (arr, path = '') => {
  const result = arr.map((i) => {
    const fullPath = `${path}${i.key}`;

    const obj = {
      head: () => plain(i.ast, `${path}${i.key}.`),
      added: () => `Property '${fullPath}' was added with value: ${stringify(i.value)}`,
      removed: () => `Property '${fullPath}' was removed`,
      unchanged: () => '',
      changed: () => `Property '${fullPath}' was updated. From ${stringify(i.oldValue)} to ${stringify(i.newValue)}`,
    };

    return obj[i.status]();
  });

  return result.filter((i) => /\S/.test(i)).join('\n');
};
export default plain;
