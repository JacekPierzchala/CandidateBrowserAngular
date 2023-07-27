import { Component, ɵinternalCreateApplication } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CandidateList } from 'src/app/models/candidate-list';
import { Pagination } from 'src/app/models/pagination';
import { CandidateFiltersService } from 'src/app/services/candidate-filters.service';
import { CandidateService } from 'src/app/services/candidate.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent  {
  candidates:CandidateList[]|undefined;
  private filtersApplied: Subscription | any;
  pagination:Pagination |undefined;

  constructor(private candidateService:CandidateService, public userStore:UserStoreService,
    private candidatesFiltersService: CandidateFiltersService ){

  }
  ngOnInit(): void {
      this.filtersApplied=this.candidatesFiltersService.FiltersApplied.subscribe(_ =>this.loadCandidates());
      this.loadCandidates();
      this.pagination= new Pagination()
    }

    loadCandidates(){
    
      this.candidateService.getCandidates().subscribe({
        next:response=>{
          if(response)
            this.candidates=response.items;
            this.pagination!.currentPage=response.pageNumber;
            this.pagination!.itemsPerPage=response.pageSize;
            this.pagination!.totalItems=response.totalCount;
            this.pagination!.totalPages=response.totalPages;
        },
      });
 
    }
    pageChanged(event:any){

        if(this.pagination && this.pagination?.currentPage!==event.page){
          this.pagination.currentPage=event.page;
          this.candidatesFiltersService.setPage(event.page)
          //this.memberService.setUserParams(this.userParams);
          this.loadCandidates();
        }
    }
    ngOnDestroy(){
      if(this.filtersApplied){
        this.filtersApplied.unsubscribe();
        this.filtersApplied=null;
      }
    }
}
