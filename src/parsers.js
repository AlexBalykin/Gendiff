import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import properties from 'properties';

export const parcerJson = (json) => JSON.parse(fs.readFileSync(path.resolve(process.cwd(), json), 'utf8'));
export const parcerYml = (yml) => yaml.safeLoad(fs.readFileSync(path.resolve(process.cwd(), yml), 'utf8'));
export const parcerIni = (ini) => properties.parse(fs.readFileSync(path.resolve(process.cwd(), ini), 'utf8'));
