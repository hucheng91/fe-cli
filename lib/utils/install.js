const ora = require('ora')
const execa = require('execa')
const {defaultNpmRes} = require('../config');
const spinner = ora('📦  安装项目依赖...')

module.exports = async function installDependencies (projectPath) {
  try {
    spinner.start()
    await execa(
      'npm',
      ['install', '--registry', defaultNpmRes],
      { stdio: 'inherit', cwd: projectPath }
    )
    spinner.succeed()
  } catch ({ message = '安装项目依赖失败' }) {
    spinner.fail()
  }
}