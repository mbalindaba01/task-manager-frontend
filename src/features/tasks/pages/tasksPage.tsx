import { useAllTasks } from "../hooks/useGetAllTasks";
import TaskCard from "../components/TaskCard";
import { Button } from "../../../components/common/Button"
import { useState } from "react";
import TaskModal from "../../../components/modals/TaskModal";
import { Task } from "../types/task";


const TaskPage = () => {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const {
        data: tasks, 
        isLoading, 
        isError, 
        error
    } = useAllTasks()

    const groupedTasks = {
        NOT_STARTED: tasks?.filter(task => task.status == "NOT_STARTED") || [],
        IN_PROGRESS: tasks?.filter(task => task.status == "IN_PROGRESS") || [],
        COMPLETED: tasks?.filter(task => task.status == "COMPLETED") || []
    }




    if(isLoading){
        return <p>Loading Tasks...</p>
    }

    if(isError){
        return <p>Error loading tasks: {error.message}</p>
    }

    return (
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
    <div className="rounded-lg bg-gray-100 p-4">
        <h2>Not Started</h2>

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
    </div>


    {/* IN PROGRESS */}
    <div className="rounded-lg bg-gray-100 p-4">
        <h2>In Progress</h2>

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
    </div>


    {/* COMPLETED */}
    <div className="rounded-lg bg-gray-100 p-4">
        <h2>Completed</h2>

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
    </div>
    </div>

    {showTaskModal && (
        <TaskModal
            task={selectedTask}
            onClose={() => setShowTaskModal(false)}
        />
        )}
    </div>
    )
}

export default TaskPage