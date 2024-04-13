const { Router } = require("express")
const { authMdw, authMdwFront } = require("../middleware/auth.middleware")
const {
    getProductsCtrl,
    getProductsByIdCtrl,
    addProductCtrl,
    updateProductCtrl,
    deleteProductCtrl
} = require("../controllers/products.controller")

const router = Router()

router.get("/", authMdwFront, getProductsCtrl)

router.get("/:pid", getProductsByIdCtrl)

router.post("/", addProductCtrl)

router.put("/:pid", updateProductCtrl)

router.delete("/:pid", deleteProductCtrl)

module.exports = router