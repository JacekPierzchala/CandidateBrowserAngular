import { Component } from '@angular/core';
import { CandidatesFilters } from 'src/app/models/candidates-filters';
import { Company } from 'src/app/models/company';
import { Project } from 'src/app/models/project';
import { CandidateFiltersService } from 'src/app/services/candidate-filters.service';
import { CandidateService } from 'src/app/services/candidate.service';
import { CompaniesService } from 'src/app/services/companies.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-candidates-filters',
  templateUrl: './candidates-filters.component.html',
  styleUrls: ['./candidates-filters.component.css']
})
export class CandidatesFiltersComponent {
  candidatesFilters:CandidatesFilters|undefined;
  companies:Company[]=[];
  projects:Project[]=[];

  constructor(private candidatesFiltersService:CandidateFiltersService, private companiesService:CompaniesService,
    private projectsService:ProjectsService){
    
  }
  ngOnInit(): void {
    this.candidatesFilters=this.candidatesFiltersService.getCandidatesFilters();
    this.loadCompanies()
    this.loadProjects()
  }


  loadCompanies(){
    this.companiesService.getCompanies().subscribe({
      next:response=>{
        if(response)
          this.companies=response.data
      },
    });
  }
  loadProjects(){
    this.projectsService.getProjects().subscribe({
      next:response=>{
        if(response)
          this.projects=response.data
      },
    });
  }
  applyFilters(){
    this.candidatesFiltersService.setCandidatesFilters(this.candidatesFilters!)
   // this.candidatesService.getCandidates();
    
  }

  resetFilters(){
    this.candidatesFilters!.firstName="";
    this.candidatesFilters!.lastName="";
    this.candidatesFilters!.companies=[]
    this.candidatesFilters!.projects=[]
    this.candidatesFiltersService.setPage(1);
    this.candidatesFiltersService.setCandidatesFilters(this.candidatesFilters!)

  }
}
