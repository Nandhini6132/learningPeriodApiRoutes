import mongoose from "mongoose";

//connect 
const connectToDB = async () => {
  const connectionUrl =
    "mongodb+srv://Nandhini:Elakkiya@cluster0.7ucexvj.mongodb.net/";
  mongoose
    .connect(connectionUrl)
    .then(() => console.log("success"))
    .catch((err) => console.log("error", err));
};

export default connectToDB;