const sh = require('shelljs')

const doesProjectExist = folder => sh.test('-d', `./${folder}`)

const questions = [{
  name: 'AUTHOR_NAME',
  type: 'input',
  message: "Author's name?",
},
{
  name: 'PROJECT_NAME',
  type: 'input',
  message: 'Project name?',
},
{
  name: 'PROJECT_DESCRIPTION',
  type: 'input',
  message: 'Project description?',
},
{
  name: 'FOLDER_NAME',
  type: 'input',
  message: 'Project folder name?',
  default: function(answers) {
    return answers.PROJECT_NAME || 'project'
  },
},
{
  name: 'RESET_FOLDER',
  type: 'confirm',
  message: 'Remove existing folder?',
  default: true,
  when: function (answers) {
    const folder = answers.FOLDER_NAME
    return doesProjectExist(folder)
  },
},
]

module.exports = {
  questions,
  doesProjectExist,
}