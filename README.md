# empowjs
Empow Blockchain Javascript SDK including geting block data, sending transactions, etc.
It can be used in browsers and also on nodejs platform.

## Installation
Using npm in your project
```
npm install empowjs
```

## CDN
```
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/empowjs@1.0.0/dist/empow.min.js"></script>
```

You can use SDK from : window.empowjs

## Usage
```
const empowjs = require('empowjs')

// CREATE WALLET OR IMPORT WALLET FROM PRIVATE KEY
const privateKeyBuffer = empowjs.Base58.decode(<YOUR PRIVATE KEY>)
const wallet = new empowjs.Wallet(privateKeyBuffer)
// OR create new wallet
// const wallet = empowjs.Wallet.create()

// INIT SDK AND CONNECT TO BLOCKCHAIN
const rpc = new empowjs.RPC(new empowjs.HTTPProvider('http://localhost:30001'))
const empow = new empowjs.EMPOW(rpc,wallet)

// SEND TX
const tx = empow.callABI("token.empow", "transfer", ["em", wallet.address, "EM2ZsEf9ZocshEqNYcVKiW7FCuBZHqMis8VMggxSJwggEpbU3", "100", "test transfer"])
// add amount limit for tx
tx.addApprove("em", 100)
// OR
// tx.addApprove("*", "unlimited") 
const handler = empow.signAndSend(tx)

handler.on("pending", (hash) => {
    console.log("on Pending")
    console.log(hash)
})

handler.on("failed", (error) => {
    console.log("on fail")
    console.log(error.message)
})

handler.on("success", (res) => {
    console.log("on success")
    console.log(res)
})
```