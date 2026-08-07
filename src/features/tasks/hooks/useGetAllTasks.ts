import { useQuery } from '@tanstack/react-query'
import { getAllTasks } from '../api/allTasks'

export const useAllTasks = () => {
    return useQuery({
        queryKey: ['tasks'],
        queryFn: getAllTasks
    })
}