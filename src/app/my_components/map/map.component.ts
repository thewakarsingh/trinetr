import { Component, OnInit, } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { interval, merge,from, of,retry, throwError, concatAll, concat, timer, catchError, map,tap, BehaviorSubject, last, first } from 'rxjs';
import { LocationInfo,AddressInfo, User } from '../../../app/Models/user';
import { variable } from '@angular/compiler/src/output/output_ast';
import * as geojson from 'geojson';
import { getValue } from '@ngxs/store';
import {RealtimeTracker} from './realtimetracking'
import { DatePipe } from '@angular/common'
import {SupportFunctions} from 'src/app/my_components/map/supportFiles'
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})




export class MapComponent implements OnInit {

  public apiKey="7a7c964d5f4884fa02fff35e39b1edca";

  public username="";

  public  trackingStatus=false;

  public liveTrackingStatus=false;

  public trackingAccuracy=0;

  public trackingStatusMsg="";

  public liveTrackingMsg="";

  private mapp:any ;

  prevPoint:LocationInfo={lat:-1,log:-1,date:"",point:1,timestamp:0};
  currentLocationObservable = new BehaviorSubject(this.prevPoint);
  date1 =new Date();


  constructor(
  

    private router: Router,
    private http: HttpClient,
    private datepipe: DatePipe,
    private fun:SupportFunctions
  //public ht:RealtimeTracker
    ) {
      

    //  date = new Date((new Date().getTime() - 3888000000));

   // ht.readCurrentPosion();

   var url="https://trackusdatabase-default-rtdb.asia-southeast1.firebasedatabase.app/location.json";
    var data={
      lat:"23",
      log:"211"
    };

   var res=this.http.post(url,data);
   var resss=this.http.get(url);
   console.log("hello:");
   console.log(res); 
   var dataa=res.subscribe(data=>console.log(data));
   console.log(dataa);


    var liveTrack:LocationInfo[]=[];

    var as:LocationInfo={lat:1,log:1,date:"",point:1,timestamp:0};
    liveTrack.push(as);
var obs=of(liveTrack);
var sub=obs.subscribe(data=>console.log("Location:  "+data[0].lat));


var asa:LocationInfo={lat:1,log:1,date:"",point:1,timestamp:0};
liveTrack.push(asa);

const currentLocationObservable = new BehaviorSubject(asa);

   }






   
  ngOnInit(): void {


    if(sessionStorage.getItem('username')==null)
    {
         if(localStorage.getItem('username')==null){
              this.router.navigate([""]);
            }
          else{
            var aass=localStorage.getItem('username');
            sessionStorage.setItem('username',JSON.stringify(aass));

          }
        }

    this.mapp= L.map('map');

    var map=this.mapp.setView([1, 1], 1);


const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      minZoom: 3,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });


    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});


var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
    denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
    aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
    golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');


var streets = L.tileLayer("", {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: ""});
var cities = L.layerGroup([littleton, denver, aurora, golden]);




    var baseMaps = {
      "OpenStreetMap": osm,
      "Mapbox Streets": streets
  };
  
  var overlayMaps = {
    "Cities": cities
  };

    var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

    

    tiles.addTo(map);

 }

  locatePoint(val:any): void{
    //mapp.remove();
    let xCod=val.xCoordinate;
    let yCod=val.yCoordinate;
    let zoomL=val.zoomL;
    let time=val.time


    const example = this.currentLocationObservable.pipe(first());
    
    const subscribe = example.subscribe(value =>{
        this.prevPoint.lat=value.lat;
        this.prevPoint.log=value.log;  
        this.prevPoint.point=value.point;
        this.prevPoint.timestamp=value.timestamp

     //   console.log("prev:");
       // console.log(this.prevPoint)
      });

    var loc:LocationInfo={lat:xCod,log:yCod,date:"",point:1,timestamp:time}

    this.currentLocationObservable.next(loc);


    var map=this.mapp.setView([xCod, yCod], zoomL);
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          minZoom: 2,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });  
      tiles.addTo(map);


    if(!val.name){

      var marker = L.marker([xCod, yCod],
        {alt: 'Your Location'}).addTo(map)
        .bindPopup('Point Located:  ' +xCod+'  ,'+yCod);
      
        var circle = L.circle([xCod, yCod], 150, {
          color: 'blue',
          fillColor: '#f03',
          fillOpacity: 0.2,
          radius: 300
      }).addTo(map);



  }
  
  else{

  var marker = L.marker([xCod, yCod],
    {alt: 'Your Location'}).addTo(map)
    .bindPopup('' +val.name+'  ,'+val.state+'  '+val.country);
  
    var circle = L.circle([xCod, yCod], 150, {
      color: 'blue',
      fillColor: '#f03',
      fillOpacity: 0.2,
      radius: 300
  }).addTo(map);

}

  
  // var popup = L.popup()
  //   .setLatLng([xCod, yCod])
  //   .setContent("Located: "+xCod+", "+yCod)
  //   .openOn(map);


  //   var greenIcon = L.icon({
  //     iconUrl: 'https://img.icons8.com/office/80/000000/map-pin.png',
  //   //  shadowUrl: 'leaf-shadow.png',
  
  //     iconSize:     [38, 95], // size of the icon
  //     shadowSize:   [50, 64], // size of the shadow
  //     iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  //     shadowAnchor: [4, 62],  // the same for the shadow
  //     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  // });

  // L.marker([xCod, yCod], {icon: greenIcon}).addTo(map);

  }






  getPositionByName(val:any){

    console.log("location");

    var url='https://api.openweathermap.org/geo/1.0/direct?q='+val.locaText+'&limit=5&appid='+this.apiKey+'';
      var url2='https://maps.googleapis.com/maps/api/geocode/json?address='+val.locaText+'&key=AIzaSyD8rcu_ZggvN3JtOiHuwEF3-N9mehg0av8';
    var res=this.http.get(url);
   // var a=res[0].name;
   console.log(res);
    var ress=res.subscribe(data=>{
      console.log(data);

      const keys = Object.keys(data);

      const entries = Object.entries(data);
      
      entries.forEach(([key, value]) => {
        // 👇️ name Tom, country Chile
        console.log(key, value.lat);

        var locationCoord = {
          xCoordinate: value.lat, 
         yCoordinate: value.lon,
         zoomL: 8,
         circle:true,
         name:value.name,
         country: value.country,
         state: value.state

          };
          value.name.toLowerCase( )
        if(value.name.toLowerCase==val.locaText.toLowerCase){

          this.locatePoint(locationCoord);

        }


      });
    });

  }

  getCurrentPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }






  locateMe(){


    this.getCurrentPosition().then(res=>{

      const locationCoord = { xCoordinate: res.lat , yCoordinate: res.lng ,zoomL: 11, circle: true};

      var url= 'https://api.openweathermap.org/geo/1.0/reverse?lat='+res.lat+'&lon='+res.lng+'&limit=5&appid='+this.apiKey+'';
     // var url2=url;
      var resultW=this.http.get(url);
   // var a=res[0].name;
    resultW.subscribe(data=>{
     console.log(data);
    
    });

    //console.log(url);
      var result=this.http.get(url);
   // var a=res[0].name;
    result.subscribe(data=>{
     console.log(data);

      const keys = Object.keys(data);

      const entries = Object.entries(data);
      
      entries.forEach(([key, value]) => {
        // 👇️ name Tom, country Chile
        console.log(key, value.lat);

        var locationCoord = {
          xCoordinate: value.lat, 
         yCoordinate: value.lon,
         zoomL: 8,
         circle:true,
         name:value.name,
         country: value.country,
         state: value.state

          };
          this.locatePoint(locationCoord);
          })
       });
   });

   this.addGeoJSonMarker();

  }






  addGeoJSonMarker() {

      var vLine: geojson.LineString = {
        type: "LineString",
        coordinates: [
    
          [
            75.234375,
            36.87962060502676
          ],
          [
            77.34374999999999,
            8.059229627200192
          ]
        
          
        ]
    };

  var hLine: geojson.LineString = {
      type: "LineString",
      coordinates: [
            [
              97.27294921875,
              28.188243641850313
            ],
            [
              68.5107421875,
              23.58412603264412
            ]
      ]
    };

      L.geoJSON(vLine).addTo(this.mapp);
      L.geoJSON(hLine).addTo(this.mapp);

    }
    public publicMarker = new L.Marker([1,1]);







  drawLine(a:LocationInfo,b:LocationInfo, info:AddressInfo){

   // var map=this.mapp.setView([b.lat, b.log], 1);

   var map=this.mapp.setView([b.lat,  b.log], b.point);

    var myStyle = {
        "color": "blue",
        "weight": 4,
        "opacity":1,
        
    };
    var line: geojson.LineString = {
      type: "LineString",
      coordinates: [

        [
          a.log,
          a.lat

        ],
        [
          b.log,
          b.lat

        ]
      ]
    };


    L.geoJSON(line, {
      style: myStyle
    }).addTo(this.mapp);

    var liveIconOld = L.icon({
      iconUrl: '../../../assets/as/oldicon.png',
  
        iconSize:     [15, 15], // size of the icon
        iconAnchor:   [10, 15], // point of the icon which will correspond to marker's location
  });

  var liveIcon = L.icon({
    iconUrl: '../../assets/as/newicon.png',

      iconSize:     [30, 30], // size of the icon
      iconAnchor:   [10, 15], // point of the icon which will correspond to marker's location
});

  map.removeLayer(this.publicMarker);
  //this.publicMarker.setLatLng([a.lat, a.log]);

  
  this.publicMarker.setIcon(liveIconOld);
  map.addLayer(this.publicMarker);

 // map.addLayer(this.publicMarker);

 var publicMarkerLive = new L.Marker([b.lat, b.log]);

publicMarkerLive.setLatLng([b.lat, b.log]);
publicMarkerLive.setIcon(liveIcon);

publicMarkerLive.bindPopup("Address: "+info.name+", "+info.state+", "+info.country+" "+"<br>"+"Speed: "+info.speed+" Km/h");

//var  marker = new L.Marker([b.lat, b.log],{icon: liveIcon});
  
 map.addLayer(publicMarkerLive);
this.publicMarker=publicMarkerLive;

  }




  


trackUser(emailid:any)
{
  var email=emailid.emailId;
    var username=JSON.stringify(email)

    username =  username.replace(/[&\/\\#^+()$~%.'":*?<>{}!@]/g, '') ;
    username=username.replace(/\s/g, '')



  var LatDate:any =this.datepipe.transform(emailid.date, 'dd_MM_YYYY');

//console.log(email.emailId);
var url="https://trackusdatabase-default-rtdb.asia-southeast1.firebasedatabase.app/"+username+"_"+LatDate+".json/";

var result=this.http.get(url);

if(result){

  var data=result.subscribe(data=>{

    if (!data) {

      this.fun.openSnackBar("No tracking Data for given data.","Close");
      return;

    } 
    

    const keys = Object.keys(data);
  
    const entries = Object.entries(data);

    entries.forEach(([key, value]) => {
      // 👇️ name Tom, country Chile
      //console.log(key, value.lat);
  
      var locationCoord = {
        xCoordinate: value.lat, 
       yCoordinate: value.log,
       zoomL: 18,
       circle:false,
       name:"",
       country: "India",
       state: "",
       time:value.time
        };
        var b:LocationInfo={lat: locationCoord.xCoordinate,date:"", log:locationCoord.yCoordinate, point:locationCoord.zoomL,timestamp:locationCoord.time};
  
        if(this.prevPoint.lat==-1&&this.prevPoint.log==-1)
          var a:LocationInfo=b;
        else
          var a:LocationInfo=this.prevPoint;
  
          var info:String=this.fun.locationDetails(b.lat,b.log);
        //  console.log(this.info);
  
      setTimeout(() => {  console.log(this.fun.info); }, 5000);
      this.drawLine(a,b,this.fun.info);    
  
      this.prevPoint=b;
  
      });
  
    
  },
  error => {
    console.log(error);
  
  }
    );
  
  
      setInterval(() => {
  
        url='https://trackusdatabase-default-rtdb.asia-southeast1.firebasedatabase.app/'+username+"_"+LatDate+'.json?orderBy="$key"&limitToLast=1';
  
  
        var result=this.http.get(url);
        
        var dataa=result.subscribe(data=>{
  
         // console.log(data);
  
            for (const key in data) {
            
              const keys = Object.keys(data);
            
              const entries = Object.entries(data);
              
              entries.forEach(([key, value]) => {
                // 👇️ name Tom, country Chile
              //  console.log(key, value.lat);
            
                var locationCoord = {
                  xCoordinate: value.lat, 
                 yCoordinate: value.log,
                 zoomL: value.zoomL,
                 circle:false,
                 accuracy:value.accu,
                 name:"",
                 country: "India",
                 state: "",
                 time:value.time
            
                  };
  
                  this.trackingAccuracy=Math.round(locationCoord.accuracy);
  
                  var b:LocationInfo={lat: locationCoord.xCoordinate,date:"", log:locationCoord.yCoordinate, point:locationCoord.zoomL,timestamp:locationCoord.time};
  
                  if(this.prevPoint.lat==0&&this.prevPoint.log==0)
                    var a:LocationInfo=b;
                  else
                    var a=this.prevPoint;

                  var  now = new Date();
                    var h=now.getMinutes();
                    var t=new Date(locationCoord.time);
                  
                    this.liveTrackingStatus=true;


                    if(t.getHours()>12){
                          this.liveTrackingMsg=t.getHours()-12+":"+t.getMinutes()+" pm";
                        }
                        else{
                           this.liveTrackingMsg=t.getHours()+":"+t.getMinutes()+" am";
                      }


                  //   if(t.getHours()==now.getHours()&&t.getMinutes()==now.getMinutes()){

                     this.liveTrackingStatus=true;

                  //   }
                  //   else{
                  //     if(t.getHours()>12){
                  //     this.liveTrackingMsg=t.getHours()-12+":"+t.getMinutes()+" pm";
                  //   }
                  //   else{
                  //      this.liveTrackingMsg=t.getHours()+":"+t.getMinutes()+" am";
                  // }
                  //     this.liveTrackingStatus=false;

                  //   }
  
                  //   if( this.liveTrackingStatus==true)
                  //     {
                 var info:String=this.fun.locationDetails(b.lat,b.log);
                    console.log(this.fun.info);
                this.drawLine(a,b,this.fun.info);    
                
                this.prevPoint=b;
           //           }
                });
            
              }
            });
  
  
  
      }, 15000);
  
        
  
  
    }
  


    else{

      console.log(result)
      
      this.fun.openSnackBar("No tracking Data for given data.","Close");


    }
  }


public logout(){
  localStorage.removeItem('username');
  sessionStorage.removeItem('username');
  this.router.navigate(["/"]);
}

}

// Wheather Forcast

// https://api.openweathermap.org/data/2.5/forecast/daily?id=524901&lang=zh_cn&appid={API key} 