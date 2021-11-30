const express = require("express");
const mealKitmodel = require('../models/data.js');
const router = express.Router();

// Route to the default home page
router.get("/", (req, res) => {
    res.render("general/home",{
        mealkits : mealKitmodel.getTopMeal()
    });
});

// Route to the about page
router.get("/onthemenu", (req, res) => {
    res.render("general/onthemenu",{
        mealkits : mealKitmodel.filteredCategory()
    });
});



module.exports = router;