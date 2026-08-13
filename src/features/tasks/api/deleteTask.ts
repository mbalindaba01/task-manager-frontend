import api from "../../../api/axios"


export const deleteTask = async (id: String) => {
    const response = await api.delete(`/tasks/${id}`)
    return response.data
}