
import { ApiService } from 'src/app/core/service/api.service';
import { Injectable } from "@angular/core";
import { LocationRequest, LocationUpdateRequest } from '../model/location.model';

@Injectable({
  providedIn: 'root',
})
export class LoactionService{
    constructor(private apiService: ApiService) { }

    delete(id: string){
        return this.apiService.delete(`locations/${id}`)
    }

    add(req: LocationRequest){
        return this.apiService.post('locations', req);
    }

    edit(req: LocationUpdateRequest){
        return this.apiService.put(`locations`, req);
    }
}
