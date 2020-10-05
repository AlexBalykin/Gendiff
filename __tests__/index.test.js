/* eslint-disable no-underscore-dangle */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('gendiff.json', () => {
  const json1 = path.join(__dirname, '../__tests__/__fixtures__/file1.json');
  const json2 = path.join(__dirname, '../__tests__/__fixtures__/file2.json');

  const expected = `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`;

  expect(gendiff(json1, json2)).toEqual(expected);
});
