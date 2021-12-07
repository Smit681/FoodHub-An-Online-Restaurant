const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//define meal kit schema
const mealKitShema = new Schema({
    tital: {
        type: String,
        unique: true,
        required: true
    },
    ingrediants: {
        type: String
    },
    descrition: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    cooking_time: {
        type: String,
        required: true
    },
    serving: {
        type: Number,
        required: true
    },
    calories_per_serving: {
        type: Number,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    top_meal: {
        type: Boolean,
        required: true
    }
})

const mealKitModel = mongoose.model("mealKits", mealKitShema);
module.exports = mealKitModel;

let trueObject;
function getTrueObject() {
    mealKitModel.find({ "top_meal": true })
        .then((kits) => {
            trueObject = kits.map(value => value.toObject());
        })
        .catch((err) => {
            console.log("Error finding top mealkit");
        })
}
getTrueObject();

module.exports.getTopMeal = function () {
    return trueObject;
}

function groupBy(collection, property) {
    var i = 0, val, index,
        values = [], result = [];
    for (; i < collection.length; i++) {
        val = collection[i][property];
        index = values.indexOf(val);
        if (index > -1)
            result[index].push(collection[i]);
        else {
            values.push(val);
            result.push([collection[i]]);
        }
    }
    return result;
}

let object;
function getobject(){
    mealKitModel.find()
        .then((collection => {
            collection = collection.map(value => value.toObject());
            object = groupBy(collection, "category");
        }))
        .catch(err => {
            console.log("Error filtering mealkit");
        })
}
getobject();

module.exports.filteredCategory = function () {
    return object;
}
