import mongoose from "mongoose";
import config from "../config";

const dbConnect = () => {
  mongoose
    .connect(config.MONGODB_URL)
    .then((conn) => console.log("db connected", conn))
    .catch((err) => {
        console.log("db connection ERROR: ", err);
        throw new Error(err)
    });
};

export default dbConnect;
