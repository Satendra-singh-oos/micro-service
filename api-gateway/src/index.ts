import { app } from "./app";
import { connectRedis } from "./config/redis";

import env from "./utils/env";

const main = async () => {
  await connectRedis();
  app.listen(env.PORT || 7680, () => {
    console.log(`Server is up and running at port : ${env.PORT || 8000}`);
  });

  app.on("error", (error: any) => {
    console.log("Error: ", error);
    throw error;
  });
};

main();
