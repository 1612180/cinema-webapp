export class ApiClient {
    constructor(url, ) {
        this.baseUrl = url
    }

    get(path, options) {
        return fetch(this.baseUrl + path, {
            ...options,
            method: 'get',
        })
    }

    post(path, body, options) {
        return fetch(this.baseUrl + path, {
            ...options,
            method: 'post',
            body: body,
        })
    }

    getJson(path, options) {
        return this.get(path, {
            ...options,
            headers: {
                ...(options ? options.headers : {}),
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
    }

    postJson(path, body, options) {
        return this.post(path, JSON.stringify(body), {
            ...options,
            headers: {
                ...(options ? options.headers : {}),
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
    }
}