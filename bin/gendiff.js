#!/usr/bin/env node
import program from 'commander';
import gendiff from '../src/index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((file1, file2) => {
    console.log(gendiff(file1, file2, program.format));
  });

program.parse(process.argv);
