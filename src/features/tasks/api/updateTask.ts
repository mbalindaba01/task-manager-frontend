import api from "../../../api/axios"
import type { Priority, Task, TaskStatus } from "../types/task";

interface UpdateTaskData {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority
}

export const updateTask = async ({
  id,
  title,
  description,
  status,
  priority
}: UpdateTaskData): Promise<Task> => {
  const response = await api.put(`/tasks/${id}`, {
    title,
    description,
    priority
  });

  return response.data;
};