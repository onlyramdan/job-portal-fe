export interface JobRequest{
    jobTitle: string,
    jobDesc: {jobTitle: string , jobDesc: string}[];
    jobSpec: string[]
}

export interface JobTitleResponse {
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

export interface JobDescriptionResponse{
    id: string;
    jobTitleId: string;
    titleDesc: string;
    description: string;
}

export interface JobSpecificationResponse{
    id: string;
    jobTitleId: string;
    specification: string;
}


export interface JobResponse{
    jobTitle: JobTitleResponse,
    jobDesc: JobDescriptionResponse[],
    jobSpec: JobSpecificationResponse[]
}


export interface UpdateJobTitleRequest{
    id: string,
    code: string,
    name: string,
    isActive: string
}


export interface UpdateDesc{
    id: string;
    titleDesc: string;
    description: string;
}

export interface UpdateSpec{
    id: string;
    specification: string;
}

