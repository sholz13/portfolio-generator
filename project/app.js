const inquirer = require ('inquirer')
//const fs = require('fs');
//const generatePage = require('./src/page-template.js');
//const profileDataArgs = process.argv.slice(2, process.argv.length);
//const [name, github] = profileDataArgs;

//fs.writeFile('index.html', generatePage(name, github), err => {
  //if (err) throw err;
  //console.log('portfolio complete! Check out index.html to see the output');
//});

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username (Required)',
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log('Please enter your github username!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:'
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      }
    }
  ]);
};

//promptUser() .then(answers => console.log(answers));

const promptProject = portfolioData => {
  console.log(`
  =================
  Add a New Project
  =================
  `);
  // If there's no 'projects' array property, create one
if (!portfolioData.projects) {
  portfolioData.projects = [];
}
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project? (Required)',
      validate: projectInput => {
        if (projectInput) {
          return true;
        } else {
          console.log('Please enter your project name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'provide a description of the project (Required)',
      validate: descriptionInput => {
        if (descriptionInput) {
          return true;
        } else {
          console.log('Please enter your project description!');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: linkInput => {
        if (linkInput) {
          return true;
        } else {
          console.log('Please enter your github link!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ])
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    }
    else {
      return portfolioData;
    }
  });
};
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });

