import { app } from "./app";
import { connectDb } from "./config/db/db";
import env from "./utils/env";

connectDb()
  .then(() => {
    app.listen(env.PORT || 7680, () => {
      console.log(
        `User-Service Server is up and running at port : ${env.PORT || 8000}`
      );
    });

    app.on("error", (error) => {
      console.log("Error: ", error);
      throw error;
    });
  })
  .catch((err) => {
    console.error("App failed");
    console.error(err.stack);
  });
