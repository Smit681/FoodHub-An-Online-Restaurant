var mealkit = [
    {
        tital: "Veg Jalfrezi",
        ingrediants: "",
        descrition: "It is an Indian stir fried veggie dish sauteed on high fire (jal) with regulr spices",
        category: "Entrees",
        price: "$10.99",
        cooking_time: "30 minutes",
        serving: 3,
        calories_per_serving: 450,
        image_url: "/pictures/jalfrazi.jpg",
        top_meal: true
    },
    {
        tital: "Aloo Gobi Masala",
        ingrediants: "",
        descrition: "Potatoes & cauliflower cooked in to taste delicious Punjabi style",
        category: "Entrees",
        price: "$11.99",
        cooking_time: "50 minutes",
        serving: 4,
        calories_per_serving: 500,
        image_url: "/pictures/alugobi.jpg",
        top_meal: false
    },
    {
        tital: "Amaravati Vegetable Curryala",
        ingrediants: "",
        descrition: "Vegetables cooked with spicy chilli paste and spices",
        category: "Entrees",
        price: "$13.99",
        cooking_time: "1 hour",
        serving: 4,
        calories_per_serving: 550,
        image_url: "/pictures/amarvati.jpg",
        top_meal: false
    },
    {
        tital: "Paneer Tikka Masala",
        ingrediants: "",
        descrition: "Homemade cheese cubes cooked with bell peppers, onions in tomato sauce with a touch of cream",
        category: "Entrees",
        price: "$12.99",
        cooking_time: "1 hour",
        serving: 4,
        calories_per_serving: 550,
        image_url: "/pictures/PaneerTikka.jpg",
        top_meal: true
    },
    {
        tital: "Veg Manchuria",
        ingrediants: "",
        descrition: "Veg balls coated in a spiced batter and tossed with a sweet and spicy Manchurian sauce",
        category: "Appetizers",
        price: "$9.99",
        cooking_time: "30 minutes",
        serving: 2,
        calories_per_serving: 400,
        image_url: "/pictures/manchurian.jpg",
        top_meal: true,
    },
    {
        tital: "Chilli Paneer",
        ingrediants: "",
        descrition: "Wok tossed cubes of deep-fried paneer, coated with tangy chilli sauce",
        category: "Appetizers",
        price: "$9.99",
        cooking_time: "20 minutes",
        serving: 2,
        calories_per_serving: 550,
        image_url: "/pictures/chilliPanner.jpg",
        top_meal: false,
    },
    {
        tital: "Hot & Sour Soup",
        ingrediants: "",
        descrition: "Spicy & tangy soup with vegetables",
        category: "Soups",
        price: "$4.99",
        cooking_time: "20 minutes",
        serving: 1,
        calories_per_serving: 150,
        image_url: "/pictures/Hot&sour.jpg",
        top_meal: true,
    },
    {
        tital: "Sweet Corn Soup",
        ingrediants: "",
        descrition: "Tender corn kernels and vegetables simmered to a soup",
        category: "Soups",
        price: "$4.49",
        cooking_time: "10 minutes",
        serving: 1,
        calories_per_serving: 100,
        image_url: "/pictures/sweet&con.jpg",
        top_meal: false,
    },
    {
        tital: "Veg Schezwan Fried Rice",
        ingrediants: "",
        descrition: "Aromatic rice stir fried with fine chopped cabbage, carrots with Schezwan spicy sauce",
        category: "Indo Chinese Speciality",
        price: "$10.99",
        cooking_time: "30 minutes",
        serving: 4,
        calories_per_serving: 600,
        image_url: "/pictures/firedrice.jpg",
        top_meal: true,
    },
    {
        tital: "Veg Hakka Noodles",
        ingrediants: "",
        descrition: "Noodles stir fried with veggies & spices",
        category: "Indo Chinese Speciality",
        price: "$9.99",
        cooking_time: "20 minutes",
        serving: 3,
        calories_per_serving: 300,
        image_url: "/pictures/Hakka.jpg",
        top_meal: true,
    }
]

module.exports.getTopMeal = function(){
    var topmeals = [];

    for(var i =0; i<mealkit.length ; i++){
        if(mealkit[i].top_meal) 
            topmeals.push(mealkit[i]);
    }

    return topmeals;
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

module.exports.filteredCategory = function(){

    var filtered = [];

    filtered = groupBy(mealkit,"category");

    return filtered;
}
