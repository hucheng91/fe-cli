
const downloadGit = require('download-git-repo')
const fs = require('fs-extra')
const ora = require('ora')
const { prompt } = require('enquirer')
const {gitLabToken} = require ('../config');
const CWD = process.cwd()
const spinner = ora('🚀  初始化模板...')

async function download (targetDir, gitPath) {
  try {
    spinner.start()
    await new Promise((resolve, reject) => {
      downloadGit(gitPath, targetDir, {clone: false, headers: 
        
        { 'PRIVATE-TOKEN': gitLabToken }}, error => {
        if (error) {
          reject(error)
        }
        else {
          resolve(targetDir)
        }
      })
    })

    spinner.succeed()
  } catch({ message = '初始化模板失败' }) {
    spinner.fail(message)
    process.exit()
  }
}
async function targetDirOperate (projectName) {
  const inCurrent = projectName === '.'
  const targetDir = path.resolve(CWD, projectName)
  if (!inCurrent && fs.existsSync(targetDir)) {
    const { action } = await prompt([
      {
        name: 'action',
        type: 'select',
        message: `${chalk.cyan(targetDir)}目录已经存在。请选择操作类型:`,
        choices: [
          { message: '覆盖', name: 'overwrite' },
          { message: '合并', name: 'merge' },
          { message: '取消', name: false }
        ]
      }
    ])
    if (!action) return false
    else if (action === 'overwrite') {
      console.log(`\n🗑️ Removing ${chalk.cyan(targetDir)}...`)
      await fs.remove(targetDir)
    }
  }
}
module.exports = {download}
