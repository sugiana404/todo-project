import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../../db/db.config.js";
import { User } from "../auth/auth.model.js";
import { BadRequestError } from "../../utils/error.types.js";

enum TaskStatus {
  NotStarted = "Not Started",
  OnProgress = "On Progress",
  Finished = "Finished",
}

function mapStatus(status: string): TaskStatus {
  const statusMap: Record<string, TaskStatus> = {
    "Not Started": TaskStatus.NotStarted,
    "On Progress": TaskStatus.OnProgress,
    Finished: TaskStatus.Finished,
  };
  const mappedStatus = statusMap[status];
  if (!mappedStatus) {
    throw new BadRequestError("Invalid status", {
      resourceType: "Task",
      resourceValue: status,
    });
  }
  return mappedStatus;
}

interface TaskAttributes {
  id: number;
  task: string;
  dueDate: Date;
  status: TaskStatus;
  uid: number;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, "id"> {}

class Task
  extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes
{
  public id!: number;
  public task!: string;
  public dueDate!: Date;
  public status!: TaskStatus;
  public uid!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        TaskStatus.NotStarted,
        TaskStatus.OnProgress,
        TaskStatus.Finished
      ),
      allowNull: false,
      defaultValue: TaskStatus.NotStarted,
    },
    uid: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Task",
    freezeTableName: true,
  }
);

User.hasMany(Task, { foreignKey: "uid" });
Task.belongsTo(User, { foreignKey: "uid" });

console.log(`Task Model Sync Status : ${Task === sequelize.models.Task}`);
export { TaskStatus, mapStatus, Task };
