const Algorithm = require('./algorithm');
const EC = require('elliptic').ec;
const nacl = require('tweetnacl');
const base58 = require('bs58');
const crc32 = require('./crc32');

const secp = new EC('secp256k1');
const ADDRESS_PREFIX = "EM"
const ADDRESS_PREFIX_BUFFER = Buffer.from(ADDRESS_PREFIX)

/**
 * 
 * @constructor
 * @Param {Buffer}priKeyBytes
 * @Param {number}algType
 */
class Wallet {
    constructor(priKeyBytes,algType = Algorithm.Ed25519) {
        this.t = algType;
        let seckey = priKeyBytes
        let pubkey

        if (this.t === Algorithm.Ed25519) {
            const kp = nacl.sign.keyPair.fromSeed(priKeyBytes.slice(0,32));
            seckey = Buffer.from(kp.secretKey.buffer);
            pubkey = seckey.slice(seckey.length / 2);

        } else if (this.t === Algorithm.Secp256k1) {
            const secpKey = secp.keyFromPrivate(priKeyBytes);
            pubkey = Buffer.from(secpKey.getPublic(true, "hex"), "hex");
            seckey = priKeyBytes;
        }
        this.address = this.pubkeyToAddress(pubkey)
        this.privateKey = base58.encode(priKeyBytes)
        this.publicKey = base58.encode(pubkey)
    }

    /**
     * @returns {Wallet}
     */

    static create(algType = Algorithm.Ed25519) {
        if (algType === Algorithm.Ed25519) {
            const kp = nacl.sign.keyPair();
            return new Wallet(Buffer.from(kp.secretKey.buffer), algType);
        }
        if (algType === Algorithm.Secp256k1) {
            const secpKey = secp.genKeyPair();
            const priKey =  Buffer.from(secpKey.getPrivate("hex"), "hex");
            return new Wallet(priKey, algType);
        }
        throw ('invalid account type'); 
    }

    pubkeyToAddress(pubkey) {
        const pubkeyWithPrefix = Buffer.concat([ADDRESS_PREFIX_BUFFER, pubkey])
        const addressNoPrefix = base58.encode(pubkeyWithPrefix)
        return ADDRESS_PREFIX + addressNoPrefix
    }

    sign(t) {
        t.addSign({
            t: this.t,
            pubkey: base58.decode(this.publicKey),
            seckey: base58.decode(this.privateKey)
        })
    }

    signTx(t) {
        t.addPublishSign(this.address, {
            t: this.t,
            pubkey: base58.decode(this.publicKey),
            seckey: base58.decode(this.privateKey)
        })
    }
}

module.exports = Wallet;