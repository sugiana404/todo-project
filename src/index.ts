import express from "express";

import { sequelize } from "./db/db.config.js";
import { config } from "./config/env.variable.config.js";

import { authRouter } from "./services/auth/auth.route.js";
import { taskRouter } from "./services/task/task.route.js";

import { errorMiddleware } from "./middlewares/error.middleware.js";
import { jwtValidator } from "./middlewares/jwt.middleware.js";
import { notFoundMiddleware } from "./middlewares/page.not.found.middleware.js";

async function startDBConnection(): Promise<void> {
  try {
    console.log("synchronize database ...");
    await sequelize.sync({ force: false, logging: false });
    console.log("DB connection has been established successfully.");
  } catch (error) {
    console.log("unable to connect to database", error);
  }
}

await startDBConnection();

const app = express();
const PORT = config.PORT || 3001;

app.use(express.json());
app.use("/auth", authRouter);

// route need jwt validator
app.use("/task", taskRouter);

// error middleware
app.use(errorMiddleware);
app.use(notFoundMiddleware);

function startServer(): void {
  app.listen(PORT, () => {
    console.log(`Listening ON PORT ${PORT}`);
  });
}

startServer();
