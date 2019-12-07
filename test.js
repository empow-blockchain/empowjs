const empowjs = require('./index')

// const wallet = empowjs.Wallet.create()
const privateKeyBuffer = empowjs.Base58.decode("2yquS3ySrGWPEKywCPzX4RTJugqRh7kJSo5aehsLYPEWkUxBWA39oMrZ7ZxuM4fgyXYs2cPwh5n8aNNpH5x2VyK1")
const wallet = new empowjs.Wallet(privateKeyBuffer)

// const rpc = new empowjs.RPC(new empowjs.HTTPProvider('http://149.28.145.11:30001'))
const rpc = new empowjs.RPC(new empowjs.HTTPProvider('http://localhost:30001'))
const empow = new empowjs.EMPOW(rpc,wallet)

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