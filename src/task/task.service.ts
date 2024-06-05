import { TaskStatus, Task } from "./task.model.js";
import { User } from "../user/user.model.js";
import { BadRequestError, NotFoundError } from "../utils/error.types.js";

export async function createTaskService(
  uid: number,
  task: string,
  dueDate: Date,
  status: TaskStatus
) {
  try {
    const isUidExist = await User.findByPk(uid);
    if (isUidExist === null) {
      throw new NotFoundError("uid not found");
    }
    let taskStatus;

    if (status === "Not Started") {
      taskStatus = TaskStatus.NotStarted;
    } else if (status === "On Progress") {
      taskStatus = TaskStatus.OnProgress;
    } else if (status === "Finished") {
      taskStatus = TaskStatus.Finished;
    } else {
      throw new BadRequestError("Invalid status");
    }

    const newTask = await Task.create({
      uid: uid,
      task: task,
      dueDate: dueDate,
      status: taskStatus,
    });
    return newTask;
  } catch (error) {
    throw error;
  }
}
