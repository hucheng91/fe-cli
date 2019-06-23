const axios = require('axios');
const {gitLabToken} = require('../config');
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

module.exports = {
    api: axios,
    get (url) {
        return axios({
            url,
            headers: {
                'PRIVATE-TOKEN': gitLabToken
            }
        })
    },
    post (url, params) {
      return axios({
        method: 'post',
        url,
        data: params,
        headers: {
            'PRIVATE-TOKEN': gitLabToken
        }
      })
    }
};