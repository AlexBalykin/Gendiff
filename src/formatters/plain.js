import _ from 'lodash';

const stringify = (value) => {
  if (_.isBoolean(value) || _.isNumber(value)) {
    return value;
  }
  return !_.isObject(value) ? `'${value}'` : '[complex value]';
};

const mapping = {
  kids: (node, path, iter) => iter(node.ast, [...path, node.key]),
  added: (node, path) => {
    const prop = [...path, node.key].join('.');
    return `Property '${prop}' was added with value: ${stringify(node.value)}`;
  },
  removed: (node, path) => {
    const prop = [...path, node.key].join('.');
    return `Property '${prop}' was removed`;
  },
  changed: (node, path) => {
    const prop = [...path, node.key].join('.');
    return `Property '${prop}' was updated. From ${stringify(node.oldValue)
    } to ${stringify(node.newValue)}`;
  },
  unchanged: () => [],
};

export default (tree) => {
  const iter = (node, path) => node.flatMap((item) => mapping[item.status](item, path, iter));
  return iter(tree, []).join('\n');
};
