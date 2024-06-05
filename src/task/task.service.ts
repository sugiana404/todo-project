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
    const user = await User.findByPk(uid);
    if (user === null) {
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

export async function updateTaskService(
  uid?: number,
  taskId?: number,
  task?: string,
  status?: TaskStatus,
  dueDate?: Date
) {
  try {
    if (uid === undefined || uid === null) {
      throw new BadRequestError("Uid can't be empty.");
    }
    const user = await User.findByPk(uid);
    if (user === null) {
      throw new NotFoundError("uid not found");
    }

    if (taskId === undefined || taskId === null) {
      throw new BadRequestError("Task id can't be empty.");
    }
    const taskData = await Task.findByPk(taskId);
    if (taskData === null) {
      throw new NotFoundError("taskId not found");
    }

    const updatedFields: Partial<Task> = {
      task,
      status,
      dueDate,
    };

    const filteredFields = Object.fromEntries(
      Object.entries(updatedFields).filter(([_, v]) => v !== undefined)
    );

    await Task.update(filteredFields, { where: { id: taskId } });

    const updatedTask = await Task.findByPk(taskId);
    return updatedTask;
  } catch (error) {
    throw error;
  }
}

export async function deleteTaskService(uid?: number, taskId?: number) {
  try {
    if (uid === undefined || uid === null) {
      throw new BadRequestError("Uid can't be empty");
    }
    const user = await User.findByPk(uid);
    if (user === null) {
      throw new NotFoundError("user not found");
    }

    if (taskId === undefined || taskId === null) {
      throw new BadRequestError("Task Id can't be empty");
    }
    const task = await Task.findByPk(taskId);
    if (task === null) {
      throw new NotFoundError("task id not found");
    }

    await task.destroy();
    return task;
  } catch (error) {
    throw error;
  }
}

export async function getAllTaskService(uid?: number) {
  try {
    const user = await User.findByPk(uid);

    if (user === null) {
      throw new NotFoundError("uid not found");
    }

    const tasks = Task.findAll({ where: { uid: uid } });
    return tasks;
  } catch (error) {
    throw error;
  }
}
