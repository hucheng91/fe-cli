import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users } from './data/user';
let _Users = Users;

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);


    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    //登录
    mock.onPost('/login').reply(config => {
      let { username, password } = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });

          if (hasUser) {
            resolve([200, { code: 200, msg: '请求成功', user }]);
          } else {
            resolve([200, { code: 500, msg: '账号或密码错误' }]);
          }
        }, 1000);
      });
    });

    //获取用户列表
    mock.onGet('/user/list').reply(config => {
      let { name } = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      let { page, name } = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //删除用户
    mock.onGet('/user/remove').reply(config => {
      let { id } = config.params;
      _Users = _Users.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除用户
    mock.onGet('/user/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Users = _Users.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑用户
    mock.onGet('/user/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Users.some(u => {
        if (u.id === id) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    //新增用户
    mock.onGet('/user/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Users.push({
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });


    mock.onGet('/sys/getUserInfo.json').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            "userId": "14",
            "userName": "nigel"
          }]);
        }, 500);
      });
    });

    mock.onPost('/validator/rules/list.json').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, { "retcode": 0, "data": "" }]);
        }, 500);
      });
    });



    mock.onGet('/sys/menu/list.json').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            "retcode": 0,
            "data": [
              {
                "id": 67,
                "systemCode": "nri-applicationplatform",
                "permName": "ESL更新",
                "parentPermId": 0,
                "permCode": "",
                "permType": "MENU",
                "permUrl": "/eslUpdate",
                "iconClass": "fa fa-search",
                "permDesc": "ESL更新",
                "permOrder": 79,
                "permStatus": "ENABLE",
                "createTime": 1508932152000,
                "updateTime": 1508934363000
              },
              {
                "id": 69,
                "systemCode": "nri-applicationplatform",
                "permName": "智能识别API",
                "parentPermId": 0,
                "permCode": "",
                "permType": "MENU",
                "permUrl": "",
                "iconClass": "fa fa-linux",
                "permDesc": "智能识别API",
                "permOrder": 80,
                "permStatus": "ENABLE",
                "createTime": 1508932152000,
                "updateTime": 1508934363000
              }, {
                "id": 70,
                "systemCode": "nri-applicationplatform",
                "permName": "烟雾和人脸识别",
                "parentPermId": 69,
                "permCode": "",
                "permType": "MENU",
                "permUrl": "/dectectApi",
                "iconClass": "",
                "permDesc": "烟雾和人脸识别",
                "permOrder": 80,
                "permStatus": "ENABLE",
                "createTime": 1508932152000,
                "updateTime": 1508934363000
              }, {
                "id": 74,
                "systemCode": "nri-applicationplatform",
                "permName": "OCR识别",
                "parentPermId": 0,
                "permCode": "",
                "permType": "MENU",
                "permUrl": "/ocr",
                "iconClass": "fa fa-bell-o",
                "permDesc": "OCR识别",
                "permOrder": 80,
                "permStatus": "ENABLE",
                "createTime": 1508932152000,
                "updateTime": 1508934363000
              }
            ]
          }
          ]);
        }, 500);
      });
    });



  }
};
