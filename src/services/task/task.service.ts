import { TaskStatus, Task, mapStatus } from "./task.model.js";
import { User } from "../auth/auth.model.js";
import { BadRequestError, DataNotFoundError } from "../../utils/error.types.js";
import { Op } from "sequelize";

export async function createTaskService(
  uid: number,
  task: string,
  dueDate: Date,
  status: TaskStatus
) {
  try {
    const taskStatus = mapStatus(status);

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
  taskId: number,
  task?: string,
  status?: TaskStatus,
  dueDate?: Date
) {
  try {
    const taskData = await Task.findByPk(taskId);

    if (taskData === null) {
      throw new DataNotFoundError("Task not found");
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

export async function deleteTaskService(taskId?: number) {
  try {
    const task = await Task.findByPk(taskId);

    if (task === null) {
      throw new DataNotFoundError("task id not found");
    }

    await task.destroy();

    return task;
  } catch (error) {
    throw error;
  }
}

export async function getAllTaskService(uid?: number) {
  try {
    const tasks = Task.findAll({ where: { uid: uid } });
    return tasks;
  } catch (error) {
    throw error;
  }
}

export async function getFilteredTaskService(
  uid?: number,
  status?: TaskStatus,
  startDate?: string,
  endDate?: string
) {
  console.log(
    `status: ${status}\nstartDate: ${startDate}\nendDate: ${endDate}`
  );
  try {
    const user = await User.findByPk(uid);

    if (user === null) {
      throw new DataNotFoundError("uid not found");
    }

    const whereClause: any = {};

    if (status !== undefined) {
      whereClause.status = status;
    }

    if (startDate !== undefined && endDate !== undefined) {
      whereClause.dueDate = {
        [Op.between]: [startDate, endDate],
      };
    }

    const tasks = await Task.findAll({ where: whereClause });
    return tasks;
  } catch (error) {
    throw error;
  }
}
