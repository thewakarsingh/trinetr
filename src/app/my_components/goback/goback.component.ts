import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-goback',
  templateUrl: './goback.component.html',
  styleUrls: ['./goback.component.css']
})
export class GobackComponent implements OnInit {

  constructor(private router:Router, private location : Location) { }

  ngOnInit(): void {
  }



  goBack(){

    this.location.back();
  
  }
  

}

