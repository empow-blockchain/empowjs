const RPC = require('../lib/rpc');
const {Tx} = require('../lib/structs');
const TxHandler = require('./tx_handler');
const Callback = require('./callback');
const Base58 = require('bs58');
const Wallet = require('../lib/crypto/wallet')

const defaultConfig = {
    gasRatio: 1,
    gasLimit: 2000000,
    delay: 0,
    expiration: 90,
    defaultLimit: "unlimited"
};

/**
 * new EMPOW
 * @constructor
 * @param {RPC}
 * @param {Wallet}
 * @param {object}config
 */
class EMPOW {
    constructor(rpc, wallet = null, config = null) {
        this.serverTimeDiff = 0;
        this.setRPC(rpc)
        if(wallet) {
            this.wallet = wallet
        }
        this.config = defaultConfig;
        if(config) {
            this.config = Object.assign(this.config, config);
        }
    }

    /**
     * Make Tx
     * @param {string}contract - contractName
     * @param {string}abi - contractFunction
     * @param {Array}args - args
     * @returns {Tx}
     */
    callABI(contract, abi, args) {
        const t = new Tx(this.config.gasRatio, this.config.gasLimit);
        t.addAction(contract, abi, JSON.stringify(args));
        t.setTime(this.config.expiration, this.config.delay, this.serverTimeDiff);
        return t
    }

    /**
     * 转账
     * @param {string}token - token名
     * @param {string}from - from
     * @param {string}to - to
     * @param {string}amount - amount
     * @param {string}memo - memo
     * @returns {Tx}
     */
    transfer(token, from, to, amount, memo = "") {
        let t = this.callABI("token.empow", "transfer", [token, from, to, amount, memo]);
        t.addApprove(token, amount);
        return t;
    }

    /**
     * Create Address
     * @returns {address,privateKey}
     */
    _checkPublicKey(key) {
        let b = Base58.decode(key);
        return b.length === 32;
    }

    /**
     * signAndSend
     * @param tx
     * @constructor
     */
    signAndSend(tx) {
        tx.setTime(this.config.expiration, this.config.delay, this.serverTimeDiff);
        let cb = new Callback(this.currentRPC.transaction);
        let hash = "";
        let self = this;

        self.wallet.signTx(tx);
        setTimeout(function () {
            self.currentRPC.transaction.sendTx(tx)
                .then(function(data){
                    hash = data.hash;
                    cb.pushMsg("pending", hash);
                    cb.hash = hash
                })
                .catch(function (e) {
                    cb.pushMsg("failed", e)
                })
        }, 50);

        return cb;
    }

    getWallet() {
        return this.wallet;
    }

    currentRPC() {
        return this.currentRPC;
    }

    async setRPC(rpc) {
        this.currentRPC = rpc;
        
        const requestStartTime = new Date().getTime() * 1e6;
        const nodeInfo = await this.currentRPC.net.getNodeInfo();
        const requestEndTime = new Date().getTime() * 1e6;

        if (requestEndTime - requestStartTime < 30 * 1e9) {
            this.serverTimeDiff = nodeInfo.server_time - requestStartTime;
        }
    };

    setWallet(wallet) {
        this.wallet = wallet;
    }
}

module.exports = EMPOW;