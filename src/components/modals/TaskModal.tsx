import TaskForm from "../../features/tasks/components/TaskForm";
import type { Task } from "../../features/tasks/types/task";

interface TaskModalProps {
  onClose: () => void;
  task?: Task | null
}


export default function TaskModal({ task, onClose }: TaskModalProps) {
   
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-xl bg-white p-6"
      >
        <TaskForm 
        task={task}
        onClose={onClose}
         />
      </div>
    </div>
  );
}