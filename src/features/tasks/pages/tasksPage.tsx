import { useAllTasks } from "../hooks/useGetAllTasks";
import TaskCard from "../components/TaskCard";
import { Button } from "../../../components/common/Button"
import { useState } from "react";
import TaskModal from "../../../components/modals/TaskModal";
import { Task } from "../types/task";
import { SortableContext } from "@dnd-kit/sortable";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import TaskColumn from "../components/TaskColumn";
import { updateTaskStatus } from "../api/updateTaskStatus";
import { useUpdateTaskStatus } from "../hooks/useUpdateTaskStatus";
import type { TaskStatus } from "../types/task";

const TaskPage = () => {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const {
        data: tasks, 
        isLoading, 
        isError, 
        error
    } = useAllTasks()

    const { mutate: updateTaskStatus } = useUpdateTaskStatus();

    const groupedTasks = {
        NOT_STARTED: tasks?.filter(task => task.status == "NOT_STARTED") || [],
        IN_PROGRESS: tasks?.filter(task => task.status == "IN_PROGRESS") || [],
        COMPLETED: tasks?.filter(task => task.status == "COMPLETED") || []
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const taskId = String(event.active.id);
        const newStatus = event.over?.id;

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
        onDragStart={() => console.log("DRAG STARTED")}
        onDragEnd={handleDragEnd}
    >
    <div className={`bg-red-500`}>
    <div className="flex items-start justify-between">
        <h1>My Tasks</h1>
        <Button
            onClick={() => {
                setSelectedTask(null);
                setShowTaskModal(true);
            }}
        >
            Add Task
        </Button>
    </div>

    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {/* NOT STARTED */}
    <TaskColumn id="NOT_STARTED">
    <div className="rounded-lg bg-gray-100 p-4 overflow-visible">
        <h2>Not Started</h2>
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
    </div>
    </TaskColumn>

    {/* IN PROGRESS */}
    <TaskColumn id="IN_PROGRESS">
    <div className="rounded-lg bg-gray-100 p-4 overflow-visible">
        <h2>In Progress</h2>
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
    </div>
    </TaskColumn>

    {/* COMPLETED */}
    <TaskColumn id="COMPLETED">
    <div className="rounded-lg bg-gray-100 p-4 overflow-visible">
        <h2>Completed</h2>
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
    </div>
    </TaskColumn>
    </div>

    {showTaskModal && (
        <TaskModal
            task={selectedTask}
            onClose={() => setShowTaskModal(false)}
        />
        )}
    </div>
    </DndContext>
    )
}

export default TaskPage