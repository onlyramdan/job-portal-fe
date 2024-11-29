export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
    email: string;
    roleId: string;
}

export interface RegisterRequestUser {
    username: string;
    password: string;
    email: string;
}

export interface VerifyRequest {
    email: string;
    verificationCode: string;
}

export interface UserSessionResponse {
    id: string;
    roleCode: string;
}
