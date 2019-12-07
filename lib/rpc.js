const Net = require('./net');
const Blockchain = require('./blockchain');
const Transaction = require('./transaction');


/**
 * @constructor
 * @param {HTTPProvider}provider - provider of this rpc
 */
class RPC {
    constructor(provider) {
        this._provider = provider;
        this.net = new Net(this);
        this.blockchain = new Blockchain(this);
        this.transaction = new Transaction(this)
    }

    /**
     * Provider
     * @param {HTTPProvider}provider - provider of this rpc
     */
    setProvider(provider) {
        this._provider = provider;
    }

    /**
     * Provider
     * @returns {HTTPProvider}provider - provider of this rpc
     */
    getProvider() {
        return this._provider;
    }
}

module.exports = RPC;