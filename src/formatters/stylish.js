import _ from 'lodash';

const stringify = (value, space = '  ') => {
  if (!_.isObject(value)) {
    return value;
  }

  const i = Object.entries(value)
    .map(([key, v]) => `{\n${space.repeat(6)}${key}: ${stringify(v)}\n${space.repeat(4)}}`);

  return i;
};

const diff = (arr) => {
  const space = '  ';
  const result = arr.map((i) => {
    if (i.status === 'head') {
      return `${space.repeat(3)}${i.key}: ${diff(i.ast)}`;
    }
    if (i.status === 'added') {
      return `${space.repeat(3)}+ ${i.key}: ${stringify(i.value)}`;
    }
    if (i.status === 'removed') {
      return `${space.repeat(3)}- ${i.key}: ${stringify(i.value)}`;
    }
    if (i.status === 'unchanged') {
      return `${space.repeat(3)}  ${i.key}: ${stringify(i.value)}`;
    }

    return `${space.repeat(3)}- ${i.key}: ${stringify(
      i.oldValue,
    )}\n${space.repeat(3)}+ ${i.key}: ${stringify(i.newValue)}`;
  });

  return `{\n${result.join('\n')}\n${space.repeat(2)}}`;
};
export default diff;
