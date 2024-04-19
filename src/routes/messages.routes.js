const { Router } = require("express")
const {
    addMessageCtrl,
    getAllMessagesCtrl
} = require("../controllers/messages.controller")

const router = Router()

router.get("/", getAllMessagesCtrl)

router.post("/", addMessageCtrl)

module.exports = router