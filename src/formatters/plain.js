import _ from 'lodash';

const stringify = (value) => {
  if (_.isBoolean(value) || _.isNumber(value)) {
    return value;
  }
  return !_.isObject(value) ? `'${value}'` : '[complex value]';
};

const getpath = (node, path) => [...path, node.key].join('.');

const mapping = {
  kids: (node, path, iter) => iter(node.ast, [...path, node.key]),
  added: (node, path) => `Property '${getpath(node, path)}' was added with value: ${stringify(node.value)}`,
  removed: (node, path) => `Property '${getpath(node, path)}' was removed`,
  changed: (node, path) => `Property '${getpath(node, path)}' was updated. From ${stringify(node.oldValue)
  } to ${stringify(node.newValue)}`,
  unchanged: () => [],
};

export default (tree) => {
  const iter = (node, path) => node.flatMap((item) => mapping[item.status](item, path, iter));
  return iter(tree, []).join('\n');
};
