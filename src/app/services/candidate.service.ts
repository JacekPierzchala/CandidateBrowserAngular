import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CandidateFiltersService } from './candidate-filters.service';
import { map } from 'rxjs';
import { CandidateDetails } from '../models/candidate-details';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  baseUrl=environment.apiUrl;
  constructor(private http:HttpClient, private candidatesFiltersService:CandidateFiltersService) {

}

getCandidateDetails(candidateId:number){
  return this.http.get<any>(this.baseUrl + '/Candidates/' + candidateId);
}

  getCandidates(){
    let filters=this.candidatesFiltersService.getCandidatesFilters();
    let params = new HttpParams();
    if(filters.firstName){
      params=params.append('firstName',filters.firstName)
    }
    if(filters.lastName){
      params=params.append('lastName',filters.lastName)
    }
    if(filters.projects.length>0){
      filters.projects.forEach((value) => {
        params = params.append('projects', value.toString());
      })

    }
    if(filters.companies.length>0){
      filters.companies.forEach((value) => {
        params = params.append('companies', value.toString());
      })
    }
    if(filters.pageNumber){
      params=params.append('pageNumber',filters.pageNumber)
    }
    return this.http.get<any>(this.baseUrl + '/Candidates',{ observe: 'response', params }).pipe(
      map((response: { body: any; })=>{
        return response.body
      })
    );
  }
}
