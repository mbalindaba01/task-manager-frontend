import api from "../../../api/axios"
import type { TaskStatus } from "../types/task"

export const updateTaskStatus = async (id: String, status: TaskStatus) => {
    const response = await api.put(`/tasks/${id}/${status}`, {status,})
    console.log(response.data)
    return response.data
}