import { app } from "./app";
import { connectDb } from "./config/db/db";
import { connectRedis } from "./config/redis/redis";
import env from "./utils/env";

connectDb()
  .then(async () => {
    await connectRedis();
    app.listen(env.PORT || 7680, () => {
      console.log(
        `Order-Service Server is up and running at port : ${env.PORT || 7680}`
      );
    });

    app.on("error", (error:any) => {
      console.log("Error: ", error);
      throw error;
    });
  })
  .catch((err) => {
    console.error("App failed");
    console.error(err.stack);
  });
