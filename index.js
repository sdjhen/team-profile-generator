const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./src/page-template.js');
const team = [];

// TODO: Write Code to gather information about the development team members, and render the HTML file.

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
        engineerDetails.githubUsername
      );
      team.push(engineer);
      createTeam(team);
    });
}

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
        name: 'ID',
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
