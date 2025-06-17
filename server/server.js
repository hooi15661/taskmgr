//--------------------------------------------------------------------------------------------------
//	server.js
//--------------------------------------------------------------------------------------------------
const express = require("express")
const http = require("http")
const cors = require("cors")
const postgres = require("postgres")
const bodyParser = require("body-parser")

const port = 9990

//--------------------------------------------------------------------------------------------------
global.app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//--------------------------------------------------------------------------------------------------
require("./api.js")

////--------------------------------------------------------------------------------------------------
//app.post("/*", async (req, res, next) => { try {
//    res.json({})
//} catch (e) { next(e) }})

//--------------------------------------------------------------------------------------------------
async function main(
) {
    var httpServer = http.createServer({}, app)
    httpServer.listen(port)

    console.log("Server running and listening on port " + port)
}
main()