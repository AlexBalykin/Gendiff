#!/usr/bin/env node
import program from 'commander';
import gendiff from '../index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((file1, file2) => {
    gendiff(file1, file2);
  });

program.parse(process.argv);
