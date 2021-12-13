const express = require("express");
const mealKitmodel = require('../models/kit');
const cartModel = require('../models/cart');

const router = express.Router();

router.get("/display/:id", (req,res) => {
    let kitid = req.params.id;
    mealKitmodel.find({_id : kitid}).lean().exec()
    .then(kit => {
        let a = kit[0]
        res.render("cart/display", {
            a
        })
    })
})

module.exports = router;