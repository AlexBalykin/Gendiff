#!/usr/bin/env node
import program from 'commander';
import gendiff from '../src/index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format: json, plain, stylish', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((data1, data2) => {
    console.log(gendiff(data1, data2, program.format));
  });

program.parse(process.argv);
