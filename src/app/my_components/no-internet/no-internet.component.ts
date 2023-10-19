import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-internet',
  templateUrl: './no-internet.component.html',
  styleUrls: ['./no-internet.component.css']
})
export class NoInternetComponent implements OnInit {

  constructor(    private router: Router,
    ) { }

  ngOnInit(): void {
    this.router.navigate(["/login"]);

  }

  retry(){
    this.router.navigate(["/login"]);
  }
}
