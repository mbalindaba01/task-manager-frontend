import type { Task, TaskStatus } from "../types/task";
import { useState } from "react";
import { Button } from "../../../components/common/Button";
import { useUpdateTaskStatus } from "../hooks/useUpdateTaskStatus";
import ConfirmDeleteModal from "../../../components/modals/ConfirmDeleteModal";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { useSortable } from "@dnd-kit/sortable";
import { Calendar } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
}

export default function TaskCard({ task, onEdit }: TaskCardProps) {
  const { mutate: updateTask } = useUpdateTaskStatus();
  const { mutate: deleteTask, isPending } = useDeleteTask();

  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
        onError: (error) => {
            console.error("DELETE FAILED", error);
        },
    });
};

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setExpanded(false);
      }}
      style={{
        touchAction: "none",
        userSelect: "none",
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        transition,
      }}
      className={`relative rounded-lg bg-[#040B11] border border-[#18415a] p-4 shadow-lg shadow-[#040B11]/20 h-50 ${isHovered ? "-translate-y-1" : ""}`}
    >
      {/* Title + menu button */}
      <div className="relative flex items-start justify-between h-1/3">
        <h4 className="pb-2 text-md capitalize font-semibold text-[#f8fcff] text-left">
          {task.title}
        </h4>

        <div className="absolute top-0 right-0">
          {isHovered && (
            <Button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => setExpanded(!expanded)}
              variant="primary"
              className="!px-2 border rounded !text-base !bg-transparent !border-none !hover:bg-transparent text-white !outline-none !focus:outline-none !focus-visible:outline-none !focus:ring-0"
              title="Menu"
            >
              {expanded ? "x" : "⋮"}
            </Button>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="relative h-2/3">
        <p className="text-left text-sm h-2/3">
          {task.description}
        </p>

        {/* Status + Priority */}
        <div className="flex items-end justify-between w-full">
        <div className="flex items-center gap-2 py-2">
          <Calendar className="h-4 w-4" />
          <span className="text-xs">
            {task.dueDate
              ? new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
            }).format(new Date(task.dueDate))
              : "No Due Date"}
          </span>
      </div>

          <p
            className={`text-sm lowercase rounded px-3 py-1 ${
              task.priority === "LOW"
                ? "bg-green-500/10 text-green-800"
                : task.priority === "MEDIUM"
                ? "bg-orange-500/10 text-yellow-800"
                : "bg-red-500/10 text-red-800"
            }`}
          >
            {task.priority}
          </p>
        </div>

        {/* Edit/Delete menu */}
        {expanded && (
          <div className="absolute right-0 top-3 flex w-4xs flex-col border border-[#040B11] bg-[#102438] shadow-lg shadow-[#000000]/20 z-50">
            <Button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => {
                  setExpanded(false)
                  onEdit()
              }
              }
              variant="ghost"
              className="border-none justify-start gap-2"
            >
              <span>Edit</span>
            </Button>

            <Button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => {
                setExpanded(false)
                setShowDeleteModal(true)
                }
              }
              variant="danger"
              className=""
            >
              <span>Delete</span>
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

