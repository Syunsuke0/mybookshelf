import mongoose from "mongoose";
import env from "dotenv";
env.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDBコネクションに成功");
  })
  .catch((err) => {
    console.log("MongoDBコネクションエラー");
    console.log(err);
  });
