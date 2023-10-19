import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import { HttpClient,  } from '@angular/common/http'
import {SupportFunctions} from 'src/app/my_components/map/supportFiles'
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {



       
  public trinetrIosLink=""
  public trinetrAndroidLink=""
  public trackifyIosLink=""
  public trackifyAndroidLink=""
  public userEmail=sessionStorage.getItem("username");


  isCheckedDetailedMap: boolean = false;
  public attempt=0;
  public isLoadingHidded=true
  loader=true
  public  trackingStatus=false;
  public email=localStorage.getItem('username');
  showFiller = false;
  constructor(    

    private router: Router,
    private datepipe: DatePipe,
    private http: HttpClient,
    private fun:SupportFunctions,
    public  ap: AppComponent

  
    ) { 

      this.email=localStorage.getItem('username');
  }


  ngOnInit(): void {



    if(localStorage.getItem('username')==null||localStorage.getItem('username')==""){
      this.router.navigate(["/login"]);

    }


    var url="https://trackusdatabase-default-rtdb.asia-southeast1.firebasedatabase.app/usefulLinks.json";
    var result=this.http.get(url);
    result.subscribe(data=>{

      const keys = Object.keys(data);
  
      const entries = Object.entries(data);

      
      this.trackifyIosLink=entries[0][1]
      this.trackifyAndroidLink=entries[1][1]
      this.trinetrIosLink=entries[2][1]
      this.trinetrAndroidLink=entries[3][1]


    
    
    


    });
    localStorage.setItem("isCheckedDetailedMap","false")
    this.isCheckedDetailedMap=false
  }
addPerson(){

  this.router.navigate(["/home/addperson"]);


}




allowTracking(){


  this.router.navigate(["/home/track"]);
  
}


toggleDetailedMap() {
  if(this.isCheckedDetailedMap==true){
    this.isCheckedDetailedMap = false
    localStorage.setItem("isCheckedDetailedMap","false")
    this.fun.openSnackBar("Reload to watch normal Tracking" ,"Close");               

  }else{
    this.isCheckedDetailedMap=true
    localStorage.setItem("isCheckedDetailedMap","true")
    this.fun.openSnackBar("Reload to watch Detailed Tracking" ,"Close");               


  }
  this.router.navigate(["/home/tracker"]);
    
  }


showAbout(){
  this.router.navigate(["/home/about"]);
}


showHelp(){

  this.router.navigate(["/home/need_help"]);

}


showPrivacy() {
  this.router.navigate(["/home/privacy_policy"]);
  }

  OpenNotification(){
    this.router.navigate(["/home/notification"]);



  }

showInstructions(){

  this.router.navigate(["/home/instructions"]);

  
}


public logout(){
  localStorage.removeItem('username');
  localStorage.removeItem('username');
  localStorage.removeItem('deviceList')
  localStorage.removeItem('ToTrackEmailid')
  localStorage.removeItem('ToTrackName')
  localStorage.removeItem('ToTrackEmailid')
  localStorage.removeItem('ToTrackName')
  localStorage.removeItem('deviceList');
  localStorage.removeItem('databaseKey');





  this.router.navigate(["/login"]);
}



}
