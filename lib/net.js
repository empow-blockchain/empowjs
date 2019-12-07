/**
 * @constructor
 * @param {RPC}rpc
 */
class Net {
    constructor(rpc) {
        this._provider = rpc.getProvider();
    }

    getProvider() {
        return this._provider;
    }

    /**
     * @returns {promise}
     */
    getNodeInfo() {
        return this._provider.send('get', 'getNodeInfo');
    }
}

module.exports = Net;