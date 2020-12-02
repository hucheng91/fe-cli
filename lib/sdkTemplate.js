const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const ora = require('ora')
const api = require('./utils/api.js')
const execa = require('execa')
const { download } = require('./utils/download.js')
const compile = require('./utils/compile.js')
const installDependencies = require('./utils/install.js')
const { defaultGitGroupObj, gitlabUrl, isCreateGitLabRes } = require('./config');
const CWD = process.cwd()
let targetDir = CWD;

async function getSDKtemplate() {
    //为sdk项目时读取参数
    let description = await getInput("请输入该仓库的描述");
    let keywords = ((await getInput("请输入标签(用空格隔开)")).split(' ').filter(e => e)) || [];
    // let bizlineIds = await getBizlineIds() || [];
    let tech = await getList("对接所需技术栈", ['vue', 'react', 'node', '其他']);
    let platform = await getList("请选择终端类型", ['pc', 'mobile', '其他']);
    let userName = await getGitUserName();
    const gitAuthor = userName
    return { description, keywords: keywords, tech, platform, gitAuthor };
}

async function getInput(message) {
    let { value } = await inquirer.prompt({
        type: 'input',
        name: 'value',
        message: message
    });
    return value || '';
}

async function getList(message, choices) {
    let { value } = await inquirer.prompt({
        type: 'list',
        name: 'value',
        message: message,
        choices: choices
    });
    return value;
}

// async function getBizlineIds() {
//     let choices = ['1 - 知乎', '2 - 微信', '3 - QQ', '4 - 支付宝'];
//     let { bizlineIdsArr } = await inquirer.prompt({
//         type: 'checkbox',
//         name: 'bizlineIdsArr',
//         message: '请选择业务线(多选,用空格选择)',
//         choices: choices
//     });
//     let bizlineIds = bizlineIdsArr.map(e => Number(e.charAt(0)));
//     return bizlineIds;
// }
async function createGitProject_SDK({ name = '', sdkParams, namespace_id = defaultGitGroupObj.id } = {}) {
    const spinner = ora(' ⚡️ 正在创建git仓库...')
    spinner.start();
    const description = sdkParams.description;
    return api.post(`${gitlabUrl}/api/v4/projects`, {
        name,
        namespace_id,
        description
    }).then(res => {
        spinner.succeed(`👏👏 创建git仓库成功!`);
        return res.path_with_namespace;
    }).catch(err => {
        spinner.fail(`💋💋 创建 gitlab 仓库失败!`);
        return `${defaultGitGroupObj.name}/${name}`;
    })
}
/**
 * 
 * @param {*} name 
 * @param {*} sdkParams 
 * @param {*} repo 
 */
async function initSdkTemplate(name, sdkParams, repo) {
    sdkParams.projectName = name;
    const spinner = ora(' ⚡️ 正在初始化项目...')
    spinner.start();
    spinner.succeed();
    targetDir = path.resolve(CWD, name)
    await download(targetDir, `${repo.url}`)
    await compile(targetDir, sdkParams)
    await initGitLabRes(name, sdkParams); // create gitlab res by gitlab api
    // await installDependencies(targetDir) // install project dependencies

}
async function initGitLabRes(name, sdkParams) {
    if (!isCreateGitLabRes) { return }
    const GIT_SKD_PROJECT_NAME = await createGitProject_SDK({ name, sdkParams }) || '';
    if (GIT_SKD_PROJECT_NAME) {
        gitOperate(GIT_SKD_PROJECT_NAME);
    }
}
async function gitOperate() {
    await run('git init')
    await run('git add -A')
    await run('git', ['commit', '-m', 'init'])
}
async function run(command, args) {
    if (!args) { [command, ...args] = command.split(/\s+/) }
    return execa(command, args, { cwd: targetDir })
}

async function getGitUserName() {
    try {
        const user = await execa('git', ['config', 'user.email']);
        let userArr = user.stdout.split('@');
        return userArr[0]
    } catch (error) {
        return "";
    }

}

module.exports = {
    getSDKtemplate,
    createGitProject_SDK,
    initSdkTemplate
}