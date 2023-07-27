import { Component, Input, OnInit } from '@angular/core';
import { CandidateList } from 'src/app/models/candidate-list';

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.css']
})
export class CandidateCardComponent implements OnInit {
@Input() candidate:CandidateList|undefined

  ngOnInit(): void {
  }


  
}
