const inquirer = require('inquirer');
const api = require('./utils/api.js')
async function getTemplate (isCreate = true) {
    //  here maybe yours  template gitlab url  like https://yourgitlab.net/api/v4/groups/
   // let list = await api.get('your url')
   let list = require('../data.json')
    let types = list.map(item => `${item.name}  ${item.description}`)
    let message = isCreate ? '请选择一个预设模板' : '未能获取到当前使用的模板,请重新选择一个模板';
    let { type } = await inquirer.prompt({
        type: 'list',
        name: 'type',
        message,
        choices: types
    })
    let repo = list[types.indexOf(type)];
    return repo;
}

module.exports = {
    getTemplate
}