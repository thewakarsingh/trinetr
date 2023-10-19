import { Component, Injectable, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LocationInfo,AddressInfo, User } from '../../../app/Models/user';
import { HttpClient } from '@angular/common/http'
import { DatePipe } from '@angular/common';

@Injectable ()


export class SupportFunctions {

  
  public adds:string="";

    constructor(private _snackBar:MatSnackBar, private http:HttpClient,private datePipe: DatePipe){

    }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
 openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  


  getFormatedTime(timestamp: any): string {

    var  now = new Date();
    var h=now.getMinutes();
    var t=new Date(timestamp);
  
  
    var h=t.getHours();
    var m=t.getMinutes();
    var hh=''+h;
    var mm=' am';
    var  mt=''+m;
    if(h>12){
       h=t.getHours()-12;
  
       mm=" pm";
  
      }
  
    if(h==12)
    mm=" pm";
  
    if(m<10){
       mt='0'+m;
    }
  
    if(h<10) 
    hh='0'+String(h);
  
  
    const date = new Date(timestamp);
      var day = date.getDate(); 
      var month=date.getMonth();
      var year=date.getFullYear();
      const formattedDate = this.datePipe.transform(date, 'MMMM', 'en');

      month=month+1
//returns date (1 to 31) you can getUTCDate() for UTC d ate


    return("  "+hh+" : "+mt+mm+" || "+day+" "+formattedDate);
      
  
  
  }
  




 distance( lat1:number, lat2:number, lon1:number, lon2:number)
 {
 
 // The math module contains a function
 // named toRadians which converts from
 // degrees to radians.
 lon1 =  lon1 * Math.PI / 180;
 lon2 = lon2 * Math.PI / 180;
 lat1 = lat1 * Math.PI / 180;
 lat2 = lat2 * Math.PI / 180;
 
 // Haversine formula
 let dlon = lon2 - lon1;
 let dlat = lat2 - lat1;
 let a = Math.pow(Math.sin(dlat / 2), 2)
 + Math.cos(lat1) * Math.cos(lat2)
 * Math.pow(Math.sin(dlon / 2),2);
 
 let c = 2 * Math.asin(Math.sqrt(a));
 
 // Radius of earth in kilometers. Use 3956
 // for miles
 let r = 6371;
 
 // calculate the result
 return(c * r);
 }
 
 
 info:AddressInfo={
     
   speed:0,
   dir:0,
   name:"Not Fount",
   state: "Not Found",
   country: "Not Found",
}
 
 locationDetails(lat:number, log:number) :string{
 
  var add:string="";

var url="https://api.openweathermap.org/geo/1.0/reverse?lat="+lat+"&lon="+log+"&limit=5&appid=10967902e5dbf2b8378b27e9e05156f0";
   
   
//var url='https://api.opencagedata.com/geocode/v1/json?q='+b.lat+'+'+b.log+'&key=6f7bf0e0b1354de9b3389f1bc4b7c263';
   
   var res= this.http.get(url);
   var ress=res.subscribe(data=>{

      const keys = Object.keys(data);
 
      const entries = Object.entries(data);

      add=entries.values.length.toString()

  ///console.log(add)
      
      entries.forEach(([key, value]) => {

        // var a:AddressInfo={
                     
        //              dir:dir,
        //              name:value.name,
        //              state: value.state,
        //              country: value.country,
        //              };


                     add=" "+value.name+", "+value.state+", "+value.country;
                     this.adds=add
              

               });
      
     }); 
   //  console.log(this.adds)

   return this.adds;


  }
 
 
  angle(cx:number,ex:number, cy:number, ey:number): number {
   var dy = ey - cy;
   var dx = ex - cx;
   var theta = Math.atan2(dy, dx); // range (-PI, PI]
   theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
   //if (theta < 0) theta = 360 + theta; // range [0, 360)
   return theta;
 }
 
 //  add(x: number, y: number): AddressInfo {
 
 
 //   var a:AddressInfo={speed:12,dir:12,name:"a",state:"a",country:"a"}
 //   return a;
 //   }
 
 
 

  calculateSpeedBetweenCoors(lat1: number, lon1: number, lat2: number, lon2: number,time2:number,time1:number): number {
  const earthRadiusKm = 6371; // Radius of the Earth in kilometers
  const dLat = this.degreesToRadians(lat2 - lat1);
  const dLon = this.degreesToRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.degreesToRadians(lat1)) *
      Math.cos(this.degreesToRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadiusKm * c * 1000; 
 // console.log(distance)
 // console.log("time")
 // console.log(time1)
  var time=(time2-time1)/1000

  if(time<1){
    return 0;
  }else{
  var speed=distance/time; //Speed is in m/s
  speed=speed*3.6; 
  //Speed is in km/s
  speed=Math.round(speed);
 // console.log("speed:") 
//.log(speed)
// Convert to meters
  return speed;}
}

// Helper function to convert degrees to radians
 degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}
// asdfg(){
//   if ('getBattery' in navigator) {
//     // Access the battery information
//     navigator.getBattery().then((battery: BatteryManager) => {
//       console.log('Charging:', battery.charging);
//       console.log('Battery Level:', battery.level);
//     });
//   } else {
//     console.log('Battery API not supported in this browser.');
//   }
  
//}
}