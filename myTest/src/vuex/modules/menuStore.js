
import * as types from '../mutation-types';
const state = {
    title: '',
    headerMenus: [],
    sidebarMenus: [],
    collapsed: false,
    locals: 'zh-CH',//语言设置
};

const getters = {
};

const actions = {
    collapse: ({ commit }) => {
        commit(types.COLLAPSE_SIDEBAR_MENU);
    },
    setLocals: ({ commit }, locals) => {
        // console.log(locals);
        commit(types.SET_LOCALS, locals);
    },
};

const mutations = {
    [types.COLLAPSE_SIDEBAR_MENU](state) {
        state.collapsed = !state.collapsed;
    },
    [types.SET_LOCALS](state, locals) {
        state.locals = locals;
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
};