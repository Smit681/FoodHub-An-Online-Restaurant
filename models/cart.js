const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId : {
        type : String,
        unique : true,
        required : true
    },
    meakits : Object
})

const cartModel = mongoose.model("shopping-cart",cartSchema);
module.exports = cartModel;