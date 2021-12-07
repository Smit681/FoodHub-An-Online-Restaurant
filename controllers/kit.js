const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const path = require("path");
const mealKitModel = require("../models/kit");

router.get("/modify", (req,res) => {
    mealKitModel.find()
    .then((titles) => {
        let temp = [];
        for(let i =0; i<titles.length; i++){
            temp.push(titles[i].tital);
        }
        titles = temp;
        res.render("kit/modify", {
            titles
        });
    })
})

router.post("/add", (req,res) => {
    let newkit = new mealKitModel({
        tital : req.body.Title,
        ingrediants : req.body.ing,
        descrition : req.body.des,
        category : req.body.cat,
        price : req.body.price,
        cooking_time : req.body.time,
        serving : req.body.ser,
        calories_per_serving : req.body.cal,
        top_meal  : req.body.top,
        image_url : "temp"
    });
   
    newkit.save()
    .then((saved) => {
        if(path.parse(req.files.pic.name).ext == '.jpeg' || path.parse(req.files.pic.name).ext == '.jpg' || path.parse(req.files.pic.name).ext == ".HEIF")
        {
        // Create a unique name for the image, so it can be stored in the file system.
        let uniqueName = `/image-pic-${saved._id}${path.parse(req.files.pic.name).ext}`;
        
        // Copy the image data to a file in the "public/pictures" folder.
        req.files.pic.mv(`public/pictures/${uniqueName}`)
        .then(() => {
            uniqueName = "/pictures" + uniqueName;
            // Update the kits document so that the name of the image is stored in the document.
            mealKitModel.updateOne({
                _id: saved._id
            }, {
                image_url: uniqueName
            })
            .then(() => {
                console.log("User document was updated with the profile picture.");
                res.redirect("/");
            })
            .catch(err => {
                console.log(`Error updating the user's profile picture ... ${err}`);
                res.redirect("/");
            })
        });
    }
    else{
        res.send('Please enter .jpeg or .jpg formate picture'); 
    }
    })
    .catch((err) => {
        console.log(err);
    })
});

router.post("/update", (req,res) => {
    let can = false;
    mealKitModel.find({tital :req.body.Title}).count({},(err,count) => {
        if(count == 1){
            can = true;
        }
        else{
            res.render("partials/err", {
                error : "Can not find mealkit"
            })
        }
    })

    if(can){
        mealKitModel.updateOne({tital : req.body.Title},{
            ingrediants : req.body.ing,
            descrition : req.body.des,
            category : req.body.cat,
            price : req.body.price,
            cooking_time : req.body.time,
            serving : req.body.ser,
            calories_per_serving : req.body.cal,
            top_meal  : req.body.top,
            image_url : "temp"
        }).
        then(() => {
            console.log("Mealkit updated");
            res.redirect("/");
        })
        .catch((err) => {
            console.log("Error: " + err);
            res.redirect("/");
        })
    }
    
})


module.exports = router;