import _ from 'lodash';

const getSpace = (deep) => ' '.repeat(deep);

const stringify = (data, deep) => {
  if (!_.isObject(data)) {
    return data;
  }
  const space = getSpace(deep);
  const result = Object.entries(data)
    .map(([key, value]) => `${space}    ${key}: ${stringify(value, deep + 4)}`);
  return `{\n${result.join('\n')}\n${space}}`;
};

const getDeepSpace = (deep) => getSpace(deep);

const mapping = {
  kids: (node, deep, iter) => `${getDeepSpace(deep)}    ${
    node.key}: {\n${iter(node.ast, deep + 4).join('\n')}\n${getSpace(deep + 4)}}`,
  added: (node, deep) => `${getDeepSpace(deep)}  + ${node.key}: ${stringify(node.value, deep + 4)}`,
  removed: (node, deep) => `${getDeepSpace(deep)}  - ${node.key}: ${stringify(node.value, deep + 4)}`,
  unchanged: (node, deep) => `${getDeepSpace(deep)}    ${node.key}: ${stringify(node.value, deep + 4)}`,
  changed: (node, deep) => `${getDeepSpace(deep)}  - ${node.key}: ${stringify(node.oldValue, deep + 4)
  }\n${getDeepSpace(deep)}  + ${node.key}: ${stringify(node.newValue, deep + 4)}`,
};

const getStylish = (tree) => {
  const iter = (node, deep) => node.map((item) => mapping[item.status](item, deep, iter));

  return `{\n${iter(tree, 0).join('\n')}\n}`;
};
export default getStylish;
