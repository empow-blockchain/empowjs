const RPC = require('./lib/rpc');
const HTTPProvider = require('./lib/provider/HTTPProvider');
const EMPOW = require('./empow/index');
const Wallet = require('./lib/crypto/wallet');
const Signature = require('./lib/crypto/signature');
const {Tx} = require('./lib/structs');
const Algorithm = require('./lib/crypto/algorithm');
const TxHandler = require('./empow/tx_handler');
const base58 = require('bs58');

module.exports = {
	EMPOW: EMPOW,
    RPC: RPC,
    HTTPProvider: HTTPProvider,
    Wallet: Wallet,
    Tx : Tx,
    Algorithm: Algorithm,
    TxHandler: TxHandler,
    Base58: base58,
    Signature: Signature,
};

(function(){
    if(typeof window !== 'undefined'){
        window.empowjs = module.exports
    }
})();