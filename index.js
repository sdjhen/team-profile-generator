const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./src/page-template.js');
const teamArr = [];

// TODO: Write Code to gather information about the development team members, and render the HTML file.

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
      teamArr.push(manager);
      console.log(manager);
    });
}
