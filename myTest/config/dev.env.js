var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //API_ROOT: '"http://172.25.16.167:1024/6tnitj!25"'
  API_ROOT: '""'
})
