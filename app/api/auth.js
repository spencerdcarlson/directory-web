import api from './api'
const logout = () => {
    return api.post({url: `${api.host}/api/ds/logout`});
};

const login = () => {
    return api.get({url: '/auth/google'})
};

export default {
    logout,
    login
}