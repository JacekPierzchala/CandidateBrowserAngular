import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateDetails } from 'src/app/models/candidate-details';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent implements OnInit {
  
  candidate: CandidateDetails|undefined
  constructor(private route: ActivatedRoute, private candidateService:CandidateService){
  }
    ngOnInit(): void {
    this.loadCandidate()
  }

  loadCandidate(){
    let candidateId:number=0
    this.route.params.subscribe({
      next:(value)=> {
        candidateId=value["id"];
      },
    },   
    )

    this.candidateService.getCandidateDetails(candidateId).subscribe({
      next:response=> {
        if(response.success){
          this.candidate=response.data
          this.candidate!.dateOfBirth =this.candidate?.dateOfBirth!.slice(0,10)
        }

      },
      error:error=>{
        this.candidate = new CandidateDetails();
        this.candidate.id=0; 
        console.log(error)
      }
    })
  }

}


