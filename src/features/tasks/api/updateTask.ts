import api from "../../../api/axios"
import type { Priority, Task, TaskStatus } from "../types/task";

interface UpdateTaskData {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority
  dueDate: string | null
}

export const updateTask = async ({
  id,
  title,
  description,
  priority,
  dueDate
}: UpdateTaskData): Promise<Task> => {

  console.log("SENDING UPDATE:", {
    id,
    title,
    description,
    priority,
    dueDate,
  });

  const response = await api.put(`/tasks/${id}`, {
    title,
    description,
    priority,
    dueDate
  });

  console.log("UPDATE RESPONSE:", response.data);

  return response.data;
};