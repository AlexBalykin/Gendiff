import yaml from 'js-yaml';
import properties from 'properties';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: properties.parse,
};

export default (data, format) => parsers[format](data);
