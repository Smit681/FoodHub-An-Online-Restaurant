const express = require("express");
const mealKitmodel = require('../models/kit');
const router = express.Router();

// Route to the default home page
router.get("/", (req, res) => {
    mealKitmodel.find({"top_meal" : true}).lean().exec()
    .then((kits) => {
        res.render("general/home",{
            mealkits : kits
        });
    })
});

// Route to the about page
router.get("/onthemenu", (req, res) => {
    mealKitmodel.find({}).lean().exec()
    .then((kits) => {
        var i = 0, val, index,
        values = [], result = [];
        for (; i < kits.length; i++) {
            val = kits[i]["category"];
            index = values.indexOf(val);
            if (index > -1)
                result[index].push(kits[i]);
            else {
                values.push(val);
                result.push([kits[i]]);
            }
        }
        res.render("general/onthemenu",{
            mealkits : result
        });
    })
});

module.exports = router;