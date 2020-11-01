import _ from 'lodash';

const getSpace = (depth) => ' '.repeat(depth);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const space = getSpace(depth);
  const result = Object.entries(data)
    .map(([key, value]) => `${space}    ${key}: ${stringify(value, depth + 4)}`);
  return `{\n${result.join('\n')}\n${space}}`;
};

const getDeepSpace = (depth) => getSpace(depth);

const mapping = {
  children: (node, depth, iter) => `${getDeepSpace(depth)}    ${
    node.key}: {\n${iter(node.ast, depth + 4).join('\n')}\n${getSpace(depth + 4)}}`,
  added: (node, depth) => `${getDeepSpace(depth)}  + ${node.key}: ${stringify(node.value, depth + 4)}`,
  removed: (node, depth) => `${getDeepSpace(depth)}  - ${node.key}: ${stringify(node.value, depth + 4)}`,
  unchanged: (node, depth) => `${getDeepSpace(depth)}    ${node.key}: ${stringify(node.value, depth + 4)}`,
  changed: (node, depth) => `${getDeepSpace(depth)}  - ${node.key}: ${stringify(node.oldValue, depth + 4)
  }\n${getDeepSpace(depth)}  + ${node.key}: ${stringify(node.newValue, depth + 4)}`,
};

export default (tree) => {
  const iter = (node, depth) => node.map((item) => mapping[item.status](item, depth, iter));

  return `{\n${iter(tree, 0).join('\n')}\n}`;
};
