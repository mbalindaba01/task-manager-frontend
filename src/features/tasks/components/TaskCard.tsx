import type { Priority, Task, TaskStatus } from "../types/task";
import { useState } from "react";
import  { Button } from "../../../components/common/Button"
import { useUpdateTaskStatus } from "../hooks/useUpdateTaskStatus";
import ConfirmDeleteModal from "../../../components/modals/ConfirmDeleteModal";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { useUpdateTask } from "../hooks/useUpdateTask";


interface TaskCardProps {
  task: Task;
  onEdit: () => void;
}

export default function TaskCard({ task, onEdit }: TaskCardProps) {
  const { mutate: updateTask } = useUpdateTaskStatus()
  const { mutate: deleteTask, isPending} = useDeleteTask()
  const [expanded, setExpanded] = useState(false)
  const [status, setStatus] = useState(task.status)

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleTaskChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as TaskStatus)
    updateTask({
      id: task.id,
      status: e.target.value as TaskStatus,
    })
  }


  const handleDelete = () => {
    deleteTask((task.id), {
      onSuccess: () => {
        setShowDeleteModal(false)
      }
    })
  }


  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      
      <div className=" relative flex items-start justify-between">
        <div className="flex items-start justify-between">
           <h2 className="text-lg font-semibold text-gray-900">
            {task.title}
          </h2>
          <div className="absolute top-0 right-0">
            <Button onClick={() => setExpanded(!expanded)} variant="primary">
              {expanded ? "X" : "..."}
            </Button>
          </div>
        </div>
      </div>
      <div className="relative">
          <p className="text-left">
            {task.description}
          </p>
      

          <div className="relative flex items-center justify-between">
            <select value={status} onChange={(e) => handleTaskChange(e)}
          className={`px-3 py-1 text-xs font-medium mt-2 block
            ${
                status === "COMPLETED"
                ? "bg-green-100 text-green-700"
                : status === "IN_PROGRESS"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-700"
            }
          `}
          > 
            <option value="NOT_STARTED">
              Not Started
            </option>
            <option value="IN_PROGRESS">
              In Progress
            </option>
            <option value="COMPLETED">
            Completed
            </option>
          </select>

          <p className={`${
             task.priority === "LOW"
                ? "bg-green-100 text-green-700"
                : task.priority === "MEDIUM"
                ? "bg-orange-100 text-yellow-700"
                : "bg-red-100 text-red-700"
          }`}>{task.priority}</p>
          </div>

      {expanded && (
        <div className="w-4xs absolute right-0 top-5 flex flex-col bg-blue-200">
          <Button onClick={onEdit} variant="primary" className="border-none">
            Edit
          </Button>
          <Button onClick={() => setShowDeleteModal(true)} variant="primary" className="border-none">
            Delete
          </Button>
        </div>
       
      )}
      </div>
       

      {showDeleteModal && (
        <ConfirmDeleteModal 
        onClose={() => setShowDeleteModal(false)
        }
        onConfirm={handleDelete}
        isDeleting={isPending}
        />
      )}

    </div>
  );
}