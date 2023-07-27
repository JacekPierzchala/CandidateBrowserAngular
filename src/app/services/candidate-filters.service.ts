import { EventEmitter, Injectable } from '@angular/core';
import { CandidatesFilters } from '../models/candidates-filters';

@Injectable({
  providedIn: 'root'
})
export class CandidateFiltersService {
  candidatesFilters:CandidatesFilters=new CandidatesFilters()
  public FiltersApplied: EventEmitter<any> = new EventEmitter<any>();
  constructor() { 

  }


  getCandidatesFilters(){
    if(localStorage.getItem('firstName')){
      this.candidatesFilters.firstName!=localStorage.getItem('firstName')
    }
    if(localStorage.getItem('lastName')){
      this.candidatesFilters.lastName!=localStorage.getItem('lastName')
    }
    if(localStorage.getItem('companies')){

      this.candidatesFilters.companies=localStorage.getItem('companies')?.split(",").map((str)=>Number(str))!;
    }
    if(localStorage.getItem('projects')){
      this.candidatesFilters.projects=localStorage.getItem('projects')?.split(",").map((str)=>Number(str))!;

    }
    return this.candidatesFilters;
  }

  setPage(pageNumber:number){
    this.candidatesFilters.pageNumber=pageNumber;
    localStorage.setItem('pageNumber',pageNumber.toString());
  }
  setCandidatesFilters(candidatesFilters:CandidatesFilters){
    this.candidatesFilters.firstName=candidatesFilters.firstName;
    localStorage.setItem('firstName',candidatesFilters.firstName!);
    this.candidatesFilters.lastName=candidatesFilters.lastName;
    localStorage.setItem('lastName',candidatesFilters.lastName!);
    this.candidatesFilters.companies=candidatesFilters.companies;
    localStorage.setItem('companies',candidatesFilters.companies.toString());
    this.candidatesFilters.projects=candidatesFilters.projects;
    localStorage.setItem('projects',candidatesFilters.projects.toString());
    this.FiltersApplied.emit();
  }
}
