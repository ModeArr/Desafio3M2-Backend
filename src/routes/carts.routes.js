const { Router } = require("express")
const path = require("path");
const pathDB = path.join(`${__dirname}/../dao/cart.json`)
const CartManager = require("../dao/CartManager");
const DBCartManager = require("../dao/DBCartManager")
const cart = new DBCartManager()
const {
    addCartCtrl,
    getCartProductsCtrl,
    addProductToCartCtrl,
    deleteProductCartCtrl,
    editProductQuantityCtrl,
    deleteAllCartProductsCtrl
} = require("../controllers/carts.controller")

const router = Router()

router.post("/", addCartCtrl)

router.get("/:cid", getCartProductsCtrl)

router.post("/:cid/product/:pid", addProductToCartCtrl)

router.delete("/:cid/product/:pid", deleteProductCartCtrl)

router.put("/:cid/product/:pid", editProductQuantityCtrl)

router.delete("/:cid", deleteAllCartProductsCtrl)

module.exports = router