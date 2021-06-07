import cookies from 'browser-cookies';
import {getFormData} from './utils';


export const api = {
    serializeData: function (data) {
        const params = new URLSearchParams();
        for (let name in data) {
            if (data.hasOwnProperty(name)) {
                if (Array.isArray(data[name])) {
                    for (let val of data[name]) {
                        params.append(name, val);
                    }
                } else {
                    params.append(name, data[name]);
                }
            }
        }
        return params;
    },
    request: function (method, url, extraHeaders, data) {
        let init = {credentials: 'same-origin', method: method};
        init.headers = {'X-Requested-With': 'XMLHttpRequest'};
        if (extraHeaders) {
            init.headers = {...init.headers, ...extraHeaders};
        }
        if (data) {
            init.body = data;
        }

        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(url, init);
                try {
                    const data = await response.json();
                    if (response.ok) {
                        resolve(data);
                    } else {
                        const err = Error(response.statusText);
                        err.res = data;
                        err.status = response.status;
                        reject(err);
                    }
                } catch (err) {
                    const error = Error(response.statusText);
                    error.status = response.status;
                    if (method === 'GET' && Number(error.status) >= 500 && Number(error.status) < 600) {
                        api.error500callbacks.forEach(callback => callback());
                    }
                    reject(error);
                }
            } catch (err) {
                reject(err);
            }
        });
    },
    get: function (url, data) {
        let newUrl = url;
        if (data) {
            newUrl = url + '?' + this.serializeData(data).toString();
        }
        return api.request('GET', newUrl, {});
    },
    post: function (url, data, method='POST') {
        const serData = this.serializeData(data);
        const extraHeaders = {
            'X-CSRFToken': cookies.get('csrftoken'),
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        return api.request(method, url, extraHeaders, serData);
    },
    patch: (url, data) => api.post(url, data, 'PATCH'),
    postFormData: function (url, data, method = 'POST') {
        const serData = getFormData(data);
        const extraHeaders = {
            'X-CSRFToken': cookies.get('csrftoken'),
        };
        return api.request(method, url, extraHeaders, serData);
    },
    patchFormData: (url, data) => api.postFormData(url, data, 'PATCH'),
    postJson: function (url, data, method='POST') {
        const serData = JSON.stringify(data);
        const extraHeaders = {
            'X-CSRFToken': cookies.get('csrftoken'),
            'Content-Type': 'application/json',
        };
        return api.request(method, url, extraHeaders, serData);
    },
    patchJson: (url, data) => api.postJson(url, data, 'PATCH'),
    putJson: function (url, data) {
        const serData = JSON.stringify(data);
        const extraHeaders = {
            'X-CSRFToken': cookies.get('csrftoken'),
            'Content-Type': 'application/json',
        };
        return api.request('PUT', url, extraHeaders, serData);
    },
    postXhr: function (url, data, onProgress = null) {
        return new Promise(async (resolve, reject) => {
            let xhr = new XMLHttpRequest();
            if (onProgress) {
                xhr.upload.onprogress = onProgress;
            }

            xhr.onloadend = function () {
                try {
                    const data = JSON.parse(xhr.response);
                    if (xhr.status === 200) {
                        resolve(data);
                    } else {
                        const err = Error(xhr.statusText);
                        err.res = data;
                        err.status = xhr.status;
                        reject(err);
                    }
                } catch (err) {
                    const error = Error(xhr.statusText);
                    error.status = xhr.status;
                    reject(error);
                }
            };

            xhr.open("POST", url);
            xhr.setRequestHeader('X-CSRFToken', cookies.get('csrftoken'));
            xhr.send(getFormData(data));
        });
    },
    on500Error(callback) {
        api.error500callbacks = api.error500callbacks || [];
        api.error500callbacks.push(callback);
    }
};

export const apiEducationSrc = '/api_v2/education-source'
