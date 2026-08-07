export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    token: string
    user: {
        createdAt: string,
        email: string,
        id: string,
        password: string,
        updatedAt: string,
        username: string,
    }
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string
    user: {
        createdAt: string,
        email: string,
        id: string,
        password: string,
        updatedAt: string,
        username: string,
    }
}