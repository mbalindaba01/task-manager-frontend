import { useAllTasks } from "../hooks/useGetAllTasks";
import TaskCard from "../components/TaskCard";
import { Button } from "../../../components/common/Button"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskModal from "../../../components/modals/TaskModal";
import { Task } from "../types/task";
import { SortableContext } from "@dnd-kit/sortable";
import { DndContext, DragOverlay, DragStartEvent,  type DragEndEvent, type CollisionDetection, pointerWithin } from "@dnd-kit/core";
import TaskColumn from "../components/TaskColumn";
import { useUpdateTaskStatus } from "../hooks/useUpdateTaskStatus";
import type { TaskStatus } from "../types/task";

const collisionDetectionStrategy: CollisionDetection = ({
  droppableContainers,
  ...args
}) => {
  const columns = droppableContainers.filter((container) =>
    ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"].includes(
      String(container.id)
    )
  );

  return pointerWithin({
    ...args,
    droppableContainers: columns,
  });
};

const TaskPage = () => {
    const navigate = useNavigate();
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const {
        data: tasks, 
        isLoading, 
        isError, 
        error
    } = useAllTasks()

    const { mutate: updateTaskStatus } = useUpdateTaskStatus();

    const handleLogout = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    const handleDragStart = (event: DragStartEvent) => {
  const task = tasks?.find(
    (task) => task.id === String(event.active.id)
  );

  setActiveTask(task ?? null);
};

    const handleDragCancel = () => {
      setActiveTask(null);
    };

    const groupedTasks = {
        NOT_STARTED: tasks?.filter(task => task.status == "NOT_STARTED") || [],
        IN_PROGRESS: tasks?.filter(task => task.status == "IN_PROGRESS") || [],
        COMPLETED: tasks?.filter(task => task.status == "COMPLETED") || []
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const taskId = String(event.active.id);
        const newStatus = event.over?.id;

        setActiveTask(null);

        if (!newStatus) {
            return;
        }

        updateTaskStatus({
            id: taskId,
            status: newStatus as TaskStatus,
        });
     };


    if(isLoading){
        return <p>Loading Tasks...</p>
    }

    if(isError){
        return <p>Error loading tasks: {error.message}</p>
    }

    return (
      <DndContext  
        collisionDetection={collisionDetectionStrategy}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
    >
    <div className="space-y-6 px-4 py-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="">
          <h1 className="text-3xl font-semibold text-[#f8fcff]">Your <span>WorkFlow</span></h1>
          <p className="text-sm text-[#a8c7d7] text-left">Let's get ahead of this week</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 justify-end">
          <Button
            onClick={() => {
                setSelectedTask(null);
                setShowTaskModal(true);
            }}
          >
              Add Task
          </Button>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="border-[#64D4FF] text-[#d8e9f2] hover:bg-[#0f293c]"
          >
            Logout
          </Button>
        </div>
      </div>
    <div className="grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
      {/* NOT STARTED */}
    <TaskColumn id="NOT_STARTED" title="Not Started">
        <SortableContext items={groupedTasks.NOT_STARTED.map(task => task.id)}>
        {groupedTasks.NOT_STARTED.map(task => (
            <TaskCard
                key={task.id}
                task={task}
                onEdit={() => {
                    setSelectedTask(task);
                    setShowTaskModal(true);
                }}
            />
        ))}
        </SortableContext>
    </TaskColumn>

    {/* IN PROGRESS */}
    <TaskColumn id="IN_PROGRESS" title="In Progress">
        <SortableContext items={groupedTasks.IN_PROGRESS.map(task => task.id)}>
        {groupedTasks.IN_PROGRESS.map(task => (
            <TaskCard
                key={task.id}
                task={task}
                onEdit={() => {
                    setSelectedTask(task);
                    setShowTaskModal(true);
                }}
            />
        ))}
        </SortableContext>
    </TaskColumn>

    {/* COMPLETED */}
    <TaskColumn id="COMPLETED" title="Completed">
        <SortableContext items={groupedTasks.COMPLETED.map(task => task.id)}>
        {groupedTasks.COMPLETED.map(task => (
            <TaskCard
                key={task.id}
                task={task}
                onEdit={() => {
                    setSelectedTask(task);
                    setShowTaskModal(true);
                }}
            />
        ))}
        </SortableContext>
    </TaskColumn>
    </div>

    {showTaskModal && (
        <TaskModal
            task={selectedTask}
            onClose={() => setShowTaskModal(false)}
        />
        )}
    </div>
    <DragOverlay dropAnimation={null}>
  {activeTask ? (
    <TaskCard
      task={activeTask}
      onEdit={() => {}}
    />
  ) : null}
</DragOverlay>
    </DndContext>
    )
}

export default TaskPage