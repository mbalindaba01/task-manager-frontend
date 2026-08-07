import api from "../../../api/axios";
import { RegisterRequest, RegisterResponse } from "../types";

export const register = async (
    data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
}