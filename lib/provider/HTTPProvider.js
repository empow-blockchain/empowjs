const axios = require('axios');

/**
 * @constructor
 * @param {string} host
 * @param {number} timeout
 */
class HTTPProvider {
    constructor(host, timeout) {
        this._host = host || 'http://localhost:30000';
        this._timeout = timeout;
    }

    /**
     * @param {string}method
     * @param {string}url - 
     * @param {string}data - 
     * @returns {promise}
     */
    send(method, url, data) {

        const config = {
            method: method,
            url: this._host + '/' + url,
            data: data,
            timeout: this._timeout,
            headers: {
                'Content-Type': 'text/plain'
            }
        };
        return axios(config).then(function (response) {
            return response.data;
        }).catch((e) => {
            if (e.response !== undefined) {
                throw new Error("error: " + JSON.stringify(e.response.data));
            } else {
                throw new Error("error: " + e);
            }
        })

    }
}

module.exports = HTTPProvider;