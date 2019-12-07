/**
 *
 * @constructor
 * @param {RPC}rpc
 */
class Transaction {
    constructor(empow) {
        this._provider = empow.getProvider();
    }

    /**
     * @param {Tx}tx
     * @returns {promise}
     */
    sendTx(tx) {
        const api = 'sendTx';
        return this._provider.send('post', api, JSON.parse(JSON.stringify(tx)))
    }

    /**
     * @param {string}hash
     * @returns {promise}
     */
    getTxByHash(hash) {
        const api = 'getTxByHash/' + hash;
        return this._provider.send('get', api);
    }

    /**
     * @param {string}hash
     * @returns {promise}
     */
    getTxReceiptByHash(hash) {
        const api = 'getTxReceiptByHash/' + hash;
        return this._provider.send('get', api);
    }

    /**
     * @param {string}txHash
     * @returns {promise}
     */
    getTxReceiptByTxHash(txHash) {
        const api = 'getTxReceiptByTxHash/' + txHash;
        return this._provider.send('get', api);
    }

}

module.exports = Transaction;