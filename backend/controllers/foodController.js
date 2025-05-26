import foodModel from "../models/foodModel.js";
import fs from 'fs';


// Add food item
const addFood = async (req, res) => {
    let image_filename = req.file?.filename || "";

    // Trim all incoming field keys to avoid issues like name\t, price\t
    const trimmedBody = {};
    for (const key in req.body) {
        trimmedBody[key.trim()] = req.body[key];
    }

    const food = new foodModel({
        name: trimmedBody.name,
        description: trimmedBody.description,
        price: trimmedBody.price,
        category: trimmedBody.category,
        image: image_filename,
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log("Error saving food:", error);
        res.status(500).json({
            success: false,
            message: "Food not added",
            error: error.message,
        });
    }
};

// Get all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error retrieving food list" });
    }
}

// remove food items
const removeFood = async (req,res) =>{
    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food remove"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export { addFood, listFood, removeFood };
