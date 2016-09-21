var instance;
const Http = () => {};

Http.prototype.get = (path) => {
    return Vue.http.get(path)
        .then(response => response.json());    
};

Http.prototype.post = (path, body) => {
    return Vue.http.post(path, JSON.stringify(body), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
};

Http.prototype.patch = (path, body) => {
    return Vue.http.patch(path, JSON.stringify(body), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
};

const SingletonHttp = () => {
    if (instance === undefined) {
        instance = new Http();
    }
    return instance;
};

export let http = new SingletonHttp();
