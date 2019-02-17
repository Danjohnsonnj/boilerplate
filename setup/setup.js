const inquirer = require('inquirer')
const sh = require('shelljs')
const project = require('./project-package')
const beautify = require('json-beautify')
const cpx = require('cpx')

const doesProjectExist = folder => sh.test('-d', `./${folder}`)

const ask = async () => {
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

  return inquirer.prompt(questions)
}

module.exports = {
  create: async () => {
    const answers = await ask()
    const {
      AUTHOR_NAME,
      PROJECT_NAME,
      PROJECT_DESCRIPTION,
      FOLDER_NAME,
      RESET_FOLDER,
    } = answers
    project.package.name = PROJECT_NAME
    project.package.author = AUTHOR_NAME
    project.package.description = PROJECT_DESCRIPTION

    if (doesProjectExist(FOLDER_NAME)) {
      if (!RESET_FOLDER) {
        sh.echo('Error: will not overwrite existing project.')
        return answers
      }
      sh.echo(`Removing existing '${FOLDER_NAME}' folder.`)
    }

    sh.set('-e')
    sh.rm('-rf', `./${FOLDER_NAME}`)
    sh.echo(`Creating ${PROJECT_NAME !== '' ? "'" + PROJECT_NAME + "'" : 'new project'} in '${FOLDER_NAME}'.`)
    sh.mkdir(`./${FOLDER_NAME}`)
    sh.touch(`./${FOLDER_NAME}/package.json`)
    const beautifiedJSON = beautify(project.package, null, 2, 80)
    sh.sed('-i', '', beautifiedJSON, `./${FOLDER_NAME}/package.json`)
    sh.sed('-i', '', `${FOLDER_NAME}
`, '.gitignore')

    sh.echo(`Copying files to '${FOLDER_NAME}'.`)
    cpx.copySync('./setup/src/*', `./${FOLDER_NAME}/src`)
    cpx.copySync('./setup/README.md', `./${FOLDER_NAME}`)
    cpx.copySync('./setup/.eslintrc', `./${FOLDER_NAME}`)
    cpx.copySync('./setup/.babelrc', `./${FOLDER_NAME}`)
    cpx.copySync('./setup/.gitignore', `./${FOLDER_NAME}`)
    cpx.copySync('./setup/webpack.config.js', `./${FOLDER_NAME}`)

    sh.set('+e')

    return answers
  },
  init: async args => {
    const {
      FOLDER_NAME,
    } = args
    await sh.cd(FOLDER_NAME).stdout
    await sh.exec('git init').stdout
    await sh.echo('Installing dependencies')
    await sh.exec('npm install').stdout
  },
}