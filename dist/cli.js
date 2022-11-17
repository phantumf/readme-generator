import { Command } from 'commander';
import ejs from 'ejs';
import inquirer from "inquirer";
import os from "os";
import { writeFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const program = new Command();
program
    .name('readme-generator')
    .description('CLI used to generate the readme.md file')
    .version('0.0.1');
program
    .command('create')
    .description('Prompt for readme')
    .option('-p, --prompt <type>', 'Prompt type (input/editor)', 'input')
    .description('Create readme')
    .action(async (options) => {
    console.log(options);
    const editor = options.prompt === 'editor';
    const q = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Title of your project >',
            default: 'example-project'
        },
        {
            type: 'input',
            name: 'name',
            message: 'You username >',
            default: os.userInfo().username
        },
        {
            type: editor ? 'editor' : 'input',
            name: 'description',
            message: 'Description of your project >',
        },
        {
            type: editor ? 'editor' : 'input',
            name: 'installation',
            message: 'Installation instructions of your project >',
        },
        {
            type: editor ? 'editor' : 'input',
            name: 'usage',
            message: 'Usage informations of your project >',
        },
        {
            type: editor ? 'editor' : 'input',
            name: 'contributing',
            message: 'Contribution informations of your project >',
        },
        {
            type: editor ? 'editor' : 'input',
            name: 'tests',
            message: 'Tests instructions of your project >',
        },
        {
            type: 'list',
            name: 'license',
            choices: ['MIT', 'ISC'],
            default: 'MIT',
        }
    ]);
    writeFileSync('./README.md', await ejs.renderFile(__dirname + '/data/templates/readme.ejs', {
        ...q,
    }));
});
program.parse(process.argv);
