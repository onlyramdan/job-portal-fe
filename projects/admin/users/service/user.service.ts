import { Injectable } from "@angular/core";
import { ApiService } from "@core/service/api.service";
import { RegisterRequest, UpdateUserRequest } from "../model/user.model";

@Injectable({
    providedIn: 'root',
  })
export class UserService{
    constructor(
        private apiService: ApiService
    ){}

    add(req: RegisterRequest){
        return this.apiService.post('users/add-by-admin', req);
    }

    getUser(id: string){
        return this.apiService.get(`users/${id}`);
    }

    edit(req: UpdateUserRequest){
        return this.apiService.put('users', req);
    }

    delete(id : string){
        return this.apiService.delete(`users/${id}`);
    }
}
