/**
 * @constructor
 * @param {RPC}rpc
 */
class Blockchain {
    constructor(empow) {
        this._provider = empow.getProvider();
    }

    /**
     * @returns {promise}
     */
    getChainInfo() {
        return this._provider.send('get', 'getChainInfo');
    }

    /**
     * @param {string}hash - hash in base58
     * @param {boolean}complete
     * @returns {promise}
     */
    getBlockByHash(hash, complete) {
        const api = 'getBlockByHash/' + hash + '/' + complete;
        return this._provider.send('get', api);
    }

    /**
     * @param {number}num 
     * @param {boolean}complete
     * @returns {promise}
     */
    getBlockByNum(num, complete) {
        const api = 'getBlockByNumber/' + num + '/' + complete;
        return this._provider.send('get', api);
    }

    /**
     * @param address
     * @param useLongestChain
     * @returns {promise}
     */
    getBalance(address, tokenSymbol = "em", useLongestChain = 0)
    {
        const api = 'getTokenBalance/' + address + '/' + tokenSymbol + '/' + useLongestChain;
        return this._provider.send('get', api);
    }

    /**
     * @param address
     * @param tokenSymbol
     * @param useLongestChain
     * @returns {promise}
     */
    getToken721Balance(address, tokenSymbol, useLongestChain = 0)
    {
        const api = 'getToken721Balance/' + address + '/' + tokenSymbol + '/' + useLongestChain;
        return this._provider.send('get', api);
    }

    /**
     * @param tokenSymbol
     * @param tokenID
     * @param useLongestChain
     * @returns {promise}
     */
    getToken721Metadata(tokenSymbol, tokenID, useLongestChain = 0)
    {
        const api = 'getToken721Metadata/' + tokenSymbol + '/' + tokenID + '/' + useLongestChain;
        return this._provider.send('get', api);
    }
    /**
     * @param tokenSymbol
     * @param tokenID
     * @param useLongestChain
     * @returns {promise}
     */
    getToken721Owner(tokenSymbol, tokenID, useLongestChain = 0)
    {
        const api = 'getToken721Owner/' + tokenSymbol + '/' + tokenID + '/' + useLongestChain;
        return this._provider.send('get', api);
    }

    /**
     * @param {string}id - 
     * @param {boolean} useLongestChain
     * @returns {promise}
     */
    getContract(id, useLongestChain = 0) {
        const api = 'getContract/' + id + '/' + useLongestChain;
        return this._provider.send('get', api);
    }

    /**
     * @param {string}contractID
     * @param {string}key
     * @param {string}field
     * @param {boolean}pending
     * @returns {promise}
     */
    getContractStorage(contractID, key, field="", pending=false) {
        if (typeof field === 'boolean') {
            pending = field;
            field = ""
        }
      
        const query = {
            "id": contractID,
            "key": key,
            "field": field,
            "by_longest_chain": pending
        };

        const api = 'getContractStorage';
        return this._provider.send('post', api, query)
    }

    /**
     * @param {string}contractID
     * @param {string}key 
     * @param {boolean}pending
     * @returns {promise}
     */
    getContractStorageFields(contractID, key, pending=false) {
        const query = {
            "id": contractID,
            "key": key,
            "by_longest_chain": pending
        };

        const api = 'getContractStorageFields';
        return this._provider.send('post', api, query)
    }

    /**
     * @param {string}id
     * @param {boolean}reversible
     * @returns {promise}
     */
    getAccountInfo(id, reversible) {
        const api = 'getAccount/' + id + '/' + (reversible? 1: 0);
        return this._provider.send('get', api);
    }

    /**
     * @returns {promise}
     */
    getGasRatio() {
        return this._provider.send('get', 'getGasRatio');
    }

    /**
     * @returns {number}
     */
    getGasUsage(actionName) {
        switch (actionName) {
            case "transfer":
                return 7800;
            case "newAccount":
                return 115000;
        }
    }

    /**
     * @returns {object}
     */
    getExchangeContractInfo() {
        return {
            "contractID": "ContractZGVqhY3c65xRs8aoC4dUdACVCKSwhMMsg2negSFxpr3",
            "minAmount": 100,
            "initialRAM": 1000,
            "initialGasPledged": 10
        }
    }
}

module.exports = Blockchain;
