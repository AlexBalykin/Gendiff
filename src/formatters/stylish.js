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

const getStylish = (arr, deep = 0) => {
  const space = getSpace(deep);
  const result = arr.map((i) => {
    const obj = {
      head: () => `${space}    ${i.key}: ${getStylish(i.ast, deep + 4)}`,
      added: () => `${space}  + ${i.key}: ${stringify(i.value, deep + 4)}`,
      removed: () => `${space}  - ${i.key}: ${stringify(i.value, deep + 4)}`,
      unchanged: () => `${space}    ${i.key}: ${stringify(i.value, deep + 4)}`,
      changed: () => `${space}  - ${i.key}: ${stringify(i.oldValue, deep + 4)
      }\n${space}  + ${i.key}: ${stringify(i.newValue, deep + 4)}`,
    };

    return obj[i.status]();
  });

  return `{\n${result.join('\n')}\n${space}}`;
};
export default getStylish;
