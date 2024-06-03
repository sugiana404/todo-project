import express from "express";

import { sequelize } from "./db/db.config.js";
import { config } from "./config/env.variable.config.js";

import { userRouter } from "./user/user.route.js";

async function startDBConnection(): Promise<void> {
  try {
    console.log("synchronize database ...");
    await sequelize.sync({ logging: false });
    console.log("DB connection has been established successfully.");
  } catch (error) {
    console.log("unable to connect to database", error);
  }
}

await startDBConnection();

const app = express();
const PORT = config.PORT || 3001;

app.use(express.json());
app.use("/user", userRouter);

function startServer(): void {
  app.listen(PORT, () => {
    console.log(`Listening ON PORT ${PORT}`);
  });
}

startServer();
