import { Injectable } from "@angular/core";
import { ApiService } from "@core/service/api.service";
import { JobRequest, UpdateDesc, UpdateJobTitleRequest, UpdateSpec } from "../model/job.model";

@Injectable({
    providedIn: 'root',
  })
export class JobsService{
    constructor(private apiService: ApiService) {}

    add(req: JobRequest){
        return this.apiService.post('jobs', req);
    }

    detail(id: string){
        return this.apiService.get(`jobs/${id}`);
    }

    deleteTitle(id: string){
        return this.apiService.delete(`job-title/${id}`);
    }

    deleteSpec(id: string){
        return this.apiService.delete(`job-specifications/${id}`);
    }

    deleteDesc(id: string){
        return this.apiService.delete(`job-descriptions/${id}`)
    }

    editJobTitle(req: UpdateJobTitleRequest){
        return this.apiService.put('job-title', req);
    }

    editDesc(req: UpdateDesc){
        return this.apiService.put('job-descriptions', req);
    }

    editSpec(req: UpdateSpec){
        return this.apiService.put('job-specifications/update', req);
    }
}
