import _ from 'lodash';

const q = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const w = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

const gendiff = (json1, json2) => {
  const unionKeys = _.union(_.keys(json1), _.keys(json2));

  const dif = unionKeys.sort().map((keys) => {
    if (!_.has(json1, keys)) {
      return `+ ${keys}: ${json2[keys]}`;
    }
    if (!_.has(json2, keys)) {
      return `- ${keys}: ${json1[keys]}`;
    }
    if (json2[keys] === json1[keys]) {
      return `  ${keys}: ${json2[keys]}`;
    }
    if (_.has(json2, keys) === _.has(json1, keys)) {
      const dif1 = `+ ${keys}: ${json2[keys]}`;
      const dif2 = `- ${keys}: ${json1[keys]}`;
      return [dif2, dif1];
    }
  });
  const result = dif.join();

  console.log(result);
};
gendiff(q, w);
