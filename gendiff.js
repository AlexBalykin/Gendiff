import program from 'commander';

program
  .version('1.0.0')
  
  .description('Compares two configuration files and shows a difference.')
  
  
  .parse(process.argv)

if (process.argv.length < 3) {
  program.help()
}