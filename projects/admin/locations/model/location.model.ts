export interface LocationResponse {
    id: string;
    code: string;
    name: string;
    createdBy: string;
    createdDate: Date;
    updatedBy: string;
    updatedDate: Date;
    isActive: boolean;
    version: number;
}

export interface LocationRequest {
    code: string;
    name: string;
}

export interface LocationUpdateRequest {
    id: string;
    name: string;
    code: string;
    isActive: boolean;
}
