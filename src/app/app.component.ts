import { Component } from '@angular/core';
import { AuthserviceService } from './services/authservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  constructor(public authService:AuthserviceService) { }

  title = 'CandidateBrowserAngular';
}
