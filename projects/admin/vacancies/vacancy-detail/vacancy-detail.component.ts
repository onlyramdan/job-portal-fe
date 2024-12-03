import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VacancyService } from '../service/vacancy.service';
import { VacancyResponse } from '../model/vacancy.model';
import { JobDescriptionResponse, JobSpecificationResponse } from '@projects/admin/jobs/model/job.model';

@Component({
  selector: 'app-vacancy-detail',
  templateUrl: './vacancy-detail.component.html',
  styleUrls: ['./vacancy-detail.component.scss']
})
export class VacancyDetailComponent {
    title= "Vacancy Details";
    vacancy: VacancyResponse;
    specifications: JobSpecificationResponse[];
    jobDescriptions: JobDescriptionResponse[];

    id: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private vacancyService: VacancyService
    ){
        this.id = route.snapshot.paramMap.get('id')
    }

    ngOnInit(){
        this.getVacancy();
    }

    getVacancy(){
        this.vacancyService.detail(this.id).subscribe({
            next: (res) => {
            this.vacancy = res.data.vacancyResponse;
            this.specifications = res.data.specifications;
            this.jobDescriptions = res.data.jobDescriptions;
            }
        })
    }

    onBack(){
        this.router.navigate(['admin/vacancies']);
    }
}
