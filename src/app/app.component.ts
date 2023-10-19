import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NetworkService } from './_services/network.service';
import { DatePipe } from '@angular/common';
import {SupportFunctions} from './my_components/map/supportFiles'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private networkSubscription: Subscription = new Subscription;
  isOnline: boolean = true;
  
  public  trackingStatus=false;


  title = 'Trinetr';
  constructor( 
    public router:Router,
    private networkService: NetworkService,
    private datepipe: DatePipe,
    private http: HttpClient,
    private fun:SupportFunctions,

    ){


    // if(sessionStorage.getItem('username')==null||sessionStorage.getItem('username')=="")
    // {
    //      if(localStorage.getItem('username')==null||localStorage.getItem('username')==''){
    //           this.router.navigate(["login"]);
    //         }
    //       else{
    //         var aass=localStorage.getItem('username');
    //         sessionStorage.setItem('username',JSON.stringify(aass));


    //       }
    //     }else{
    //     this.router.navigate(["home/tracker"]);
    //     }

 /* setTimeout(() => {

    this.title="New Title generated.";
    
  }, 2000); 
*/
}
ngOnInit() {
  this.networkSubscription = this.networkService.isOnline().subscribe(
    (online) => {
      this.isOnline = online;
    }
  );
}

ngOnDestroy() {
  this.networkSubscription.unsubscribe();
}

sendTracking(){
  if(this.trackingStatus==true)
  {  this.fun.openSnackBar(" Tracking Stopped " ,"Close");

  this.trackingStatus=false;
return;
}


var email=localStorage.getItem('username');
var username=JSON.stringify(email)

username =  username.replace(/[&\/\\#^+()$~%.'":*?<>{}!@]/g, '') ;
username=username.replace(/\s/g, '')

var zoom=18;

var idd=1122; 

var date = new Date();
var LatDate:any =this.datepipe.transform(date, 'd-M-YYYY');

setInterval(() => { 

  if(this.trackingStatus==false){
    return;
  }
  navigator.geolocation.getCurrentPosition(resp => {

    var id=1234;

    var url="https://trackusdatabase-default-rtdb.asia-southeast1.firebasedatabase.app/Tracking_Data/"+username+"/"+LatDate+".json";
     
  var data={

    lat:resp.coords.latitude,
    log:resp.coords.longitude,
    accuracy:resp.coords.accuracy,
    speed:10,
    time:resp.timestamp,
    device:"browser"

      }



      
    
  ;

var res=this.http.post(url,data);
var result=this.http.get(url);

var dataa=res.subscribe(data=>{var a=2;});//


 });


} , 10000);

this.fun.openSnackBar("You are Now being Tracked on Id: " +email,"Close");




this.trackingStatus=true;
}


}
