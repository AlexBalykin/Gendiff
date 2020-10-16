/* eslint-disable no-underscore-dangle */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPath = (str) => path.join(__dirname, `../__tests__/__fixtures__/${str}`);

test('gendiff', () => {
  const json1 = getPath('file1.json');
  const json2 = getPath('file2.json');

  const yml1 = path.join(__dirname, '../__tests__/__fixtures__/file3.yml');
  const yml2 = path.join(__dirname, '../__tests__/__fixtures__/file4.yml');

  const ini1 = path.join(__dirname, '../__tests__/__fixtures__/file5.ini');
  const ini2 = path.join(__dirname, '../__tests__/__fixtures__/file6.ini');

  const expected = fs.readFileSync(path.join(__dirname, '../__tests__/__fixtures__/expected'), 'utf8');

  expect(gendiff(json1, json2)).toEqual(expected);
  expect(gendiff(yml1, yml2)).toEqual(expected);
  expect(gendiff(ini1, ini2)).toEqual(expected);
});
