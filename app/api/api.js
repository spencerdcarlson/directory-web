import js_cookie from 'js-cookie'

const host = 'http://localhost:4000';

const csrf_cookie = ({key = 'csrf'} = {}) => {
    const token = encodeURIComponent(js_cookie.get(key));
    js_cookie.remove(key);
    return token;
};

const user_uid = () => {
    return get({url: '/api/ds/user/uid'})
};

const get = ({url = null} = {}) => {
    return fetch(url)
        .then(handle_errors)
        .then(handle_body)
};

const csrf = () => {
    return get({url: '/api/ds/csrf'})
};

const post = ({ url = null, data = {} } = {}) => {
    // Notes on CSRF via API - https://bit.ly/39Vo27m
    csrf().then(({ csrf: token = null } = {}) => {
        if (token) {
            return fetch(url, {
                credentials: "include", // this determines when to send cookies (include means to send them, even if its not samesite (like when we proxy in local dev)
                mode: "cors",
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": token
                }
            });
        }
        else {
            throw new HTTPException({code: 400, message: 'Could not fetch CSRF token before POST request.'})
        }
    }).then(handle_errors).then(handle_body);
};

// get content-type from response
// 'JSON' or 'TEXT'
const type = (response) => {
    const content_type = response.headers.get('content-type');
    return (content_type && content_type.includes('application/json')) ? 'JSON' : 'TEXT';
};

// custom HTTP exception
const HTTPException = function({code = -1, message = ''} = {}) {
    this.code = code;
    this.message = message;
};

// throw an HTTPError status > 399
const handle_errors = (response) => {
    if (response.status > 399) {
        if (type(response) == 'TEXT') {
            return response.text().then(message => throw new HTTPException({code: response.status, message}))
        } else if (type(response) == 'JSON') {
            return response.json().then(message => throw new HTTPException({code: response.status, message}))
        }
    }
    else {
        return response;
    }
};

const handle_body = (response) => {
    if (type(response) == 'TEXT') {
        return response.text()
    }
    else if (type(response) == 'JSON') {
        return response.json()
    }
};

export default {
    host,
    get,
    post,
    csrf,
    user_uid,
}
