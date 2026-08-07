import api from "../../../api/axios";
import type { Task } from "../types/task";

export interface CreateTaskData {
  title: string;
  description: string;
}

export const createTask = async (task: CreateTaskData): Promise<Task> => {
  const response = await api.post("/tasks", task);
  console.log(response.data)
  return response.data;
};