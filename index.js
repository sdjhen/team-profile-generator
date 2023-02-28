const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');

// check if output directory exists || create if not
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync('output');
}

const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./src/page-template.js');
const team = [];

function createEngineer(team) {
  inquirer
    .prompt([
      // Engineer name
      {
        type: 'input',
        name: 'name',
        message: "What is the Engineer's name?",
      },
      // Engineer id
      {
        type: 'input',
        name: 'id',
        message: "What are the Engineer's ID credentials?",
      },
      // Engineer email
      {
        type: 'input',
        name: 'email',
        message: "What is the Engineer's Email?",
      },

      // Engineer GitHub username
      {
        type: 'input',
        name: 'github',
        message: "What is the Engineer's Github Username?",
      },
    ])
    .then((engineerDetails) => {
      const engineer = new Engineer(
        engineerDetails.name,
        engineerDetails.id,
        engineerDetails.email,
        engineerDetails.github
      );
      team.push(engineer);
      createTeam(team);
    });
}
6;

function createIntern(team) {
  inquirer
    .prompt([
      // Intern name
      {
        type: 'input',
        name: 'name',
        message: "What is the intern's name?",
      },
      // Intern id
      {
        type: 'input',
        name: 'id',
        message: "What are the Intern's ID credentials?",
      },
      // Intern email
      {
        type: 'input',
        name: 'email',
        message: "What is the Intern's Email?",
      },
      // Intern school
      {
        type: 'input',
        name: 'school',
        message: "What is the Intern's School?",
      },
    ])
    .then((internDetails) => {
      const intern = new Intern(
        internDetails.name,
        internDetails.id,
        internDetails.email,
        internDetails.school
      );
      team.push(intern);
      createTeam(team); // at this point we add an intern to the team array
    });
}

function createTeam(team) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'memberChoice',
        message: 'What type of team member do you want to add?',
        choices: [
          'Engineer',
          'Intern',
          "I don't want to add any more team members",
        ],
      },
    ])
    .then((choice) => {
      if (choice.memberChoice === 'Engineer') {
        createEngineer(team);
      } else if (choice.memberChoice === 'Intern') {
        createIntern(team);
      } else {
        const html = render(team); // will be HTML file as string
        // write html to a file  using fs library
        fs.writeFile(outputPath, html, (err) => {
          if (err) {
            console.log('Failed to write HTML file');
          }
        });
      }
    });
}

function createManager(team) {
  inquirer
    .prompt([
      // Manager name
      {
        type: 'input',
        name: 'name',
        message: "What is the team manager's name?",
      },
      // Manager id
      {
        type: 'input',
        name: 'id',
        message: "What are the manager's ID credentials?",
      },
      // Manager email
      {
        type: 'input',
        name: 'email',
        message: "What is the manager's Email?",
      },
      // Manager office number (phone number)
      {
        type: 'input',
        name: 'officeNumber',
        message: "What is the Manager's Office Number?",
      },
    ])
    .then((managerDetails) => {
      // Init Manager class to create Manager object
      const manager = new Manager(
        managerDetails.name,
        managerDetails.id,
        managerDetails.email,
        managerDetails.officeNumber
      );
      team.push(manager);
      createTeam(team);
    });
}

function start() {
  createManager(team);
}

start();
