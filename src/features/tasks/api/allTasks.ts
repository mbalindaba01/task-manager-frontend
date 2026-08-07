import api from '../../../api/axios'
import { allTasksResponse } from '../types/task'

export const getAllTasks = async (): Promise<allTasksResponse> => {
    const response = await api.get('/tasks')
    return response.data
}