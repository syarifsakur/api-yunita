const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const port = 3001
const router = require("./routes/auth")

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(router)
app.use("/publics/uploads", express.static("publics/uploads"))

app.listen(port,()=>[
    console.log("server berjalan di port",port)
])