import mongoose from "mongoose";

//model creation 
const BlogSchema=new mongoose.Schema({
    title:String,
    description:String
})

const Blog= mongoose.models.Blog || mongoose.model('Blog',BlogSchema)
export default Blog