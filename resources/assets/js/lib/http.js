var instance;
var Http = function() {};

Http.prototype.get = function(path) {
    return Vue.http.get(path)
        .then(response => response.json());    
};

Http.prototype.post = function(path, body) {
    return Vue.http.post(path, JSON.stringify(body), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
};

Http.prototype.patch = function(path, body) {
    return Vue.http.patch(path, JSON.stringify(body), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
};

var SingletonHttp = function() {
    if (instance === undefined) {
        instance = new Http();
    }
    return instance;
};

module.exports = new SingletonHttp();
