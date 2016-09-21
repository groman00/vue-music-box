/** 
 * @module lib/http
 */

/**
 * A variable to store a single instance of Http
 * @type    {Http}
 */
var instance;

/** 
 * Class for making http requests using vue-resource
 * @class
 */
class Http {

    /**
     * AJAX GET request
     * @param   {String} path - Path to api endpoint
     * @return  {Promise} 
     */
    get(path) {
        return Vue.http.get(path)
            .then(response => response.json());    
    }

    /**
     * AJAX POST request
     * @param  {String} path - Path to api endpoint
     * @param  {Object} body - json data to post
     * @return {Promise} 
     */
    post(path, body) {
        return Vue.http.post(path, JSON.stringify(body), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    /**
     * AJAX Patch request
     * @param  {String} path - Path to api endpoint
     * @param  {Object} body - json data to patch
     * @return {Promise}
     */
    patch(path, body) {
        return Vue.http.patch(path, JSON.stringify(body), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
}

/**
 * Returns single instance of Http Class
 * @return {Http}
 */
const SingletonHttp = () => {
    if (instance === undefined) {
        instance = new Http();
    }
    return instance;
};

export let http = new SingletonHttp();
