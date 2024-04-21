const express = require("express")
const router = express.Router()
const authControllers = require("../controllers/auth")
const verify = require("../middlewares/verify-token")
const upload = require("../middlewares/upload")

router.post("/register",authControllers.register)
router.post("/login",authControllers.login)
router.post("/Artikel",upload.single("foto"),authControllers.addArtikel)
router.get("/artikel",verify,authControllers.getArtikel)

module.exports = router