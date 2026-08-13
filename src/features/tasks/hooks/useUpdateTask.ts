import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../api/updateTask";
import type { Priority, TaskStatus } from "../types/task";

interface UpdateTaskPayload {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string | null
}

export function useUpdateTask() {
 
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTaskPayload) => updateTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
}