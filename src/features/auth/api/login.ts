import api from "../../../api/axios";
import { LoginRequest, LoginResponse } from "../types";

export const login = async (
        data: LoginRequest): Promise<LoginResponse> => {
            const response = await api.post('/auth/login', data )
            return response.data
        }
