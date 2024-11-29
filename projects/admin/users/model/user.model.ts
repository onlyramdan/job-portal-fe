export interface RegisterRequest {
    username: string;
    password: string;
    email: string;
    roleId: string;
}

export interface UpdateUserRequest{
    id: string;
    username: string;
    email: string;
    roleId: string;
    isActive: boolean;
}

export interface UserResponse{
    id: string;
    username: string;
    email: string;
    roleId: string;
    role: string;
    isActive: boolean;
    version: number;
}

