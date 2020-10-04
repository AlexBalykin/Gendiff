import gendiff from '../index.js';
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const q = JSON.parse(fs.readFileSync(path.join(__dirname, '../__fixtures__/file1.json'), 'utf8'));
console.log(q);

test('gendiff.json', () => {
  const json1 = path.join(__dirname, '../__fixtures__/file1.json');
  const json2 = path.join(__dirname, '../__fixtures__/file2.json');

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
