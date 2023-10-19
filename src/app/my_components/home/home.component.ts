import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showFiller = false;

  constructor(    private router: Router,
    ) { 

      this.router.navigate(["/home/tracker"]);


;  }

  ngOnInit(): void { 
    
    this.router.navigate(["/home/tracker"]);


  }

}
