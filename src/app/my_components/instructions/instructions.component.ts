import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  constructor(

    public head: HeaderComponent
  ) { }

  ngOnInit(): void {
  }

  openPlayStore() {

    const packageName = 'com.parmartechnologies.Trinetr_App';
    const playStoreUrl = `market://details?id=${packageName}`;

    // Open the Play Store app if available, or open the web version if not
    window.location.href = playStoreUrl;
  }

}
