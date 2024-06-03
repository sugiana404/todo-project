import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.config.js";

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

console.log(User === sequelize.models.User);

export { User };
