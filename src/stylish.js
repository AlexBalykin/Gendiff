const stringify = (value) => JSON.stringify(value).replace(/"/g, '');

const diff = (arr) => {
  const space = '  ';
  const result = arr.map((i) => {
    if (i.status === 'head') {
      return `${space.repeat(2)}${i.key}: ${diff(i.ast)}`;
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
  return `{\n${result.join('\n')}`;
};
export default diff;
