const inquirer = require('inquirer')
const sh = require('shelljs')
const project = require('./project-package')
const beautify = require('json-beautify')
const { questions, doesProjectExist, } = require('./inquirer-questions')

module.exports = {
  create: async (promts = questions) => {
    const answers = await inquirer.prompt(promts)
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
      sh.rm('-rf', `./${FOLDER_NAME}`)
    }

    sh.echo(`Creating ${PROJECT_NAME !== '' ? "'" + PROJECT_NAME + "'" : 'new project'} in '${FOLDER_NAME}'.`)
    sh.mkdir(`./${FOLDER_NAME}`)
    sh.touch(`./${FOLDER_NAME}/package.json`)
    const beautifiedJSON = beautify(project.package, null, 2, 80)
    sh.sed('-i', '', beautifiedJSON, `./${FOLDER_NAME}/package.json`)
    sh.sed('-i', '', `${FOLDER_NAME}
`, '.gitignore')

    sh.echo(`Copying files to '${FOLDER_NAME}'.`)
    sh.cp('-r', './setup/src/', `./${FOLDER_NAME}/src`)
    sh.cp('./setup/README.md', `./${FOLDER_NAME}`)
    sh.cp('./setup/.eslintrc', `./${FOLDER_NAME}`)
    sh.cp('./setup/.babelrc', `./${FOLDER_NAME}`)
    sh.cp('./setup/.gitignore', `./${FOLDER_NAME}`)
    sh.cp('./setup/webpack.config.js', `./${FOLDER_NAME}`)

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