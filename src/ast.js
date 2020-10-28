import _ from 'lodash';

const getAst = (data1, data2) => {
  const unionKeys = _.union(_.keys(data1), _.keys(data2));

  const ast = unionKeys.sort().map((key) => {
    if (!_.has(data1, key) && _.has(data2, key)) {
      return {
        key,
        status: 'added',
        value: data2[key],
      };
    }
    if (!_.has(data2, key) && _.has(data1, key)) {
      return {
        key,
        status: 'removed',
        value: data1[key],
      };
    }
    if (_.isEqual(data2[key], data1[key])) {
      return {
        key,
        status: 'unchanged',
        value: data2[key],
      };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        key,
        status: 'kids',
        ast: getAst(data1[key], data2[key]),
      };
    }
    return {
      key,
      status: 'changed',
      newValue: data2[key],
      oldValue: data1[key],
    };
  });

  return ast;
};
export default getAst;
