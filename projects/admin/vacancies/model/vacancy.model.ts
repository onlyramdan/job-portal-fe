export interface VacancyResponse {
    id: string;
    code: string;
    picHrId: string;
    jobTitleId: string;
    jobTitle: string;
    locationId: string;
    location: string;
    employeeTypeId: string;
    employeeType: string;
    experienceLevelId: string;
    experienceLevel: string;
    minSalary: number;
    maxSalary: number;
    applicationDeadline: string;
    overview: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
    isActive: boolean;
    version: number;
    status: string;
}


export interface VacancyRequest {
    jobTitleId: string;
    locationId: string;
    employeeTypeId: string;
    experienceLevelId: string;
    minSalary: number;
    maxSalary: number;
    applicationDeadline: Date;
    overview: string;
}

