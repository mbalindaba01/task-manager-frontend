import { useState } from "react";
import { Button } from "../../../components/common/Button";
import type { Task, TaskStatus, Priority } from "../types/task";
import { useCreateTask } from "../hooks/useCreateTask";
import { useUpdateTask } from "../hooks/useUpdateTask";

interface TaskFormProps {
  onClose: () => void;
  task?: Task | null;
}

export default function TaskForm({ onClose, task }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [priority, setPriority] = useState(task?.priority ?? "MEDIUM");
  const [status, setStatus] = useState<TaskStatus>(
    task?.status ?? "NOT_STARTED"
  );

  const { mutate: createTask } = useCreateTask();
  const { mutate: updateTask } = useUpdateTask();

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("NOT_STARTED");
    setPriority("MEDIUM")
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const taskData = {
      title,
      description,
      status,
      priority
    };

   

    if (task) {
      // EDIT MODE
      updateTask(
        {
          id: task.id,
          ...taskData,
        },
        {
          onSuccess: () => {
            resetForm();
            onClose();
          },
        }
      );
    } else {
      // CREATE MODE
      createTask(taskData, {
        onSuccess: () => {
          resetForm();
          onClose();
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border bg-white p-6 shadow-sm"
    >
      <div className="space-y-2">
        <label htmlFor="title" className="font-medium">
          Title
        </label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          className="w-full rounded-md border p-2"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="font-medium">
          Description
        </label>

        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          rows={4}
          className="w-full rounded-md border p-2"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="priority" className="font-medium">
          Priority
        </label>

        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="w-full rounded-md border p-2"
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
      </div>

      <Button type="submit">
        {task ? "Save Changes" : "Add Task"}
      </Button>
    </form>
  );
}