const execa = require('execa')
const ora = require('ora')
const { getTemplate } = require('./template')
const { getSDKtemplate, initSdkTemplate } = require('./sdkTemplate')
module.exports = async (name, options) => {
  const spinner = ora()
  const repo = await getTemplate()
  let sdkParams = await getSDKtemplate(); // 获取交互参数
  await initSdkTemplate(name, sdkParams || {}, repo);
  spinner.succeed('success, do what you want');
}