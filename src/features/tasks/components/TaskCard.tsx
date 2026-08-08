import type { Task, TaskStatus } from "../types/task";
import { useState } from "react";
import { Button } from "../../../components/common/Button";
import { useUpdateTaskStatus } from "../hooks/useUpdateTaskStatus";
import ConfirmDeleteModal from "../../../components/modals/ConfirmDeleteModal";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { useSortable } from "@dnd-kit/sortable";

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
}

export default function TaskCard({ task, onEdit }: TaskCardProps) {
  const { mutate: updateTask } = useUpdateTaskStatus();
  const { mutate: deleteTask, isPending } = useDeleteTask();

  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState(task.status);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: task.id,
  });

  const handleTaskChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as TaskStatus);

    updateTask({
      id: task.id,
      status: e.target.value as TaskStatus,
    });
  };

  const handleDelete = () => {
    deleteTask(task.id, {
      onSuccess: () => {
        setShowDeleteModal(false);
      },
    });
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        touchAction: "none",
        userSelect: "none",
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        transition,
      }}
      className="relative mb-4 rounded-lg bg-white p-4 shadow"
    >
      {/* Title + expand button */}
      <div className="relative flex items-start justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {task.title}
        </h2>

        <div className="absolute top-0 right-0">
          <Button
            onClick={() => setExpanded(!expanded)}
            variant="primary"
          >
            {expanded ? "X" : "..."}
          </Button>
        </div>
      </div>

      {/* Description */}
      <div className="relative">
        <p className="text-left">
          {task.description}
        </p>

        {/* Status + Priority */}
        <div className="relative flex items-center justify-between">
          <select
            value={status}
            onChange={handleTaskChange}
            className={`mt-2 block px-3 py-1 text-xs font-medium ${
              status === "COMPLETED"
                ? "bg-green-100 text-green-700"
                : status === "IN_PROGRESS"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-700"
            }`}
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

          <p
            className={`${
              task.priority === "LOW"
                ? "bg-green-100 text-green-700"
                : task.priority === "MEDIUM"
                ? "bg-orange-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {task.priority}
          </p>
        </div>

        {/* Edit/Delete menu */}
        {expanded && (
          <div className="absolute right-0 top-5 flex w-4xs flex-col bg-blue-200">
            <Button
              onClick={onEdit}
              variant="primary"
              className="border-none"
            >
              Edit
            </Button>

            <Button
              onClick={() => setShowDeleteModal(true)}
              variant="primary"
              className="border-none"
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <ConfirmDeleteModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          isDeleting={isPending}
        />
      )}
    </div>
  );
}

