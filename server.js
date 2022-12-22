import app from "./app";
import config from "./config";
import { dbConnect } from "./database";

(async () => {
  try {
    // PORT
    app.listen(config.PORT, () => {
      console.log(`port running on ${config.PORT}`);
      // database connection
      dbConnect();
    });
  } catch (err) {
    console.log("Error: ", err.message);
    throw new Error(err);
  }
})();
