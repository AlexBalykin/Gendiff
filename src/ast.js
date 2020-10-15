import _ from 'lodash';

const getAst = (file1, file2) => {
  const unionKeys = _.union(_.keys(file1), _.keys(file2));

  const ast = unionKeys.sort().map((key) => {
    if (!_.has(file1, key) && _.has(file2, key)) {
      return {
        key,
        status: 'added',
        value: file2[key],
      };
    }
    if (!_.has(file2, key) && _.has(file1, key)) {
      return {
        key,
        status: 'removed',
        value: file1[key],
      };
    }
    if (_.isEqual(file2[key], file1[key])) {
      return {
        key,
        status: 'unchanged',
        value: file2[key],
      };
    }
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return {
        key,
        status: 'head',
        ast: getAst(file1[key], file2[key]),
      };
    }
    return {
      key,
      status: 'changed',
      newValue: file2[key],
      oldValue: file1[key],
    };
  });

  return ast;
};
export default getAst;
