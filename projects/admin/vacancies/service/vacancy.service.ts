import { ApiService } from './../../../../src/app/core/service/api.service';
import { Injectable } from "@angular/core";
import { VacancyRequest } from "../model/vacancy.model";

@Injectable({
    providedIn: 'root',
  })
export class VacancyService{

    constructor(
        private apiService : ApiService
    ){}

    add(req: VacancyRequest){
        return this.apiService.post('vacancies', req);
    }

    detail(id: string){
        return this.apiService.get(`vacancies/${id}`);
    }

    delete(id: string){
        return this.apiService.delete(`vacancies/${id}`);
    }

    edit(id: string, req: VacancyRequest){
        return this.apiService.put(`vacancies/${id}`, req);
    }
}
