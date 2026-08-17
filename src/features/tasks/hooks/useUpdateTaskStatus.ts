import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskStatus } from "../types/task";
import { updateTaskStatus } from "../api/updateTaskStatus";

export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: TaskStatus;
    }) => updateTaskStatus(id, status),

    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(["tasks"], (oldTasks = []) =>
        oldTasks.map((task) =>
          task.id === id ? { ...task, status } : task
        )
      );

      return { previousTasks };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
}