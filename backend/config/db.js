import mongoose from "mongoose";

export const connectDB = async() =>{
    await mongoose.connect('mongodb+srv://bimal:bimal2002@cluster0.jdjbl.mongodb.net/mountain-eats').then(()=>{console.log("DB Connected")})
}