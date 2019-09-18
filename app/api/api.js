import js_cookie from 'js-cookie'

const host = 'http://localhost:4000';

const get_csrf = () => {
    const name = 'csrf';
    const token = encodeURIComponent(js_cookie.get(name));
    js_cookie.remove(name);
    // const token = encodeURIComponent(Array.from(document.getElementsByTagName('meta'))
    //     .find(node => node.name == 'csrf-token').content);
    return token;
};

const csrf = () => {
  return get({url: '/api/ds/csrf'})
};

const get = ({url = null} = {}) => {
    return fetch(url)
        .then(handle_errors)
        .then(handle_body)
};

const post = ({url = null, data = {}} = {}) => {
    return fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json',
            'X-CSRF-Token': get_csrf()
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
    csrf
}

// export { default as auth } from './auth'
