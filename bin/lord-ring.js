#!/usr/bin/env node
/*
 * @Author: hucheng
 * @Date: 2020-05-09 07:36:51
 * @Description: here is des
 */


const program = require('commander');

program
    .version(require('../package').version)
    .description('frontend cli version')
    .usage('<command> [options]')

program
    .command('create <project-name>')
    .description('初始化项目')
    .option('-g, --git [path] ', '是否创建git仓库')
    .action(async (name, cmd) => {
        const options = cleanArgs(cmd)
        require('../lib/create')(name, options)
    })
program
    .command('git')
    .description('git相关的一些配置操作')
    .action(() => {
        require('../lib/git')()
    })

program.command('*')
    .action(function (env) {
        console.log('指令错误');
    });
program.parse(process.argv);


function camelize (str) {
    return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}
function cleanArgs (cmd) {
    const args = {}
    cmd.options.forEach(o => {
        const key = camelize(o.long.replace(/^--/, ''))
        if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
        args[key] = cmd[key]
        }
    })
    return args
}
  