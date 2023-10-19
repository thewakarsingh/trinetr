import { Component, OnInit,ChangeDetectorRef,NgZone,ElementRef, Renderer2 } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient} from '@angular/common/http'
import { of, BehaviorSubject, skip, timestamp, Head } from 'rxjs';
import { LocationInfo,AddressInfo, User } from '../../Models/user';
import * as geojson from 'geojson';
import { DatePipe } from '@angular/common'
import {SupportFunctions} from 'src/app/my_components/map/supportFiles'
import { Route, Router } from '@angular/router';
import  {Device} from './../../Models/general';
import  {HeaderComponent} from '../header/header.component'
@Component({

  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})

export class TrackerComponent implements OnInit {
 
  public devicelist:Device[]=[];
  public ToTrackEmailid=localStorage.getItem('ToTrackEmailid');
  public ToTrackName=localStorage.getItem('ToTrackName');
  public  ToTrackBatteryP=100
  public apiKey="7a7c964d5f4884fa02fff35e39b1edca";
  public TrackingDate="";
  public liveAddress="Unknown"
  public previousCoordSpeed=0;
  public updatedMinutesAgo=0
  public today:any
  public noDeviceFound=true;
  public deviceListUp=false
  private todayDate:object={
    date:new Date()

  }
  public trackingClicked=false;
  public trackingFound=false
  public trackingInFun=false
  intervalId: any;
  public userEmail=sessionStorage.getItem("username");
  public username="";
  public  trackingStatus=false;
  public liveTrackingStatus=false;
  public trackingAccuracy=0;
  public trackingStatusMsg="";
  public liveTrackingMsg="";
  public mapp:any ;
  public start=true;
  public previousCord:LocationInfo={lat:0,log:0,date:"",point:1,timestamp:0};
  public currentsCord:LocationInfo={lat:23,log:85,date:"",point:1,timestamp:0};

  prevPoint:LocationInfo={lat:0,log:0,date:"",point:1,timestamp:0};


  currentLocationObservable = new BehaviorSubject(this.prevPoint);
  date1 =new Date();
maxDate: any;
liveTrackingScreenMsg: any="none";


  constructor(
    private elementRef: ElementRef,
     private renderer: Renderer2,
    private ngZone: NgZone,
    private cdRef: ChangeDetectorRef,
    private header: HeaderComponent,
    private router: Router,
    private http: HttpClient,
    private datepipe: DatePipe,
    //private mf:MapFunctions,
    private fun:SupportFunctions,
  //public ht:RealtimeTracker
    )
    {
     var temp = new Date();
     this.today =this.datepipe.transform(temp, 'd-M-YYYY');
      this.maxDate = new Date();
      this.maxDate.setHours(23, 59, 59);
          if(localStorage.getItem("ToTrackEmailid")!=""&&localStorage.getItem("ToTrackEmailid")!=null){

            setTimeout(() => {
              this.trackUser(this.todayDate) 
    
              }, 100);
    

        }    
        else{
          setTimeout(() => {
          this.loadMap(23.5941,80.1376,4)

          }, 100);

         

        } setTimeout(() => {
          this.loadDeviceList();

          }, 2000);
   
   }



  ngOnInit(): void {
    setTimeout(() => {
      this.loadMap(23.5941,80.1376,4)

      }, 100);

  }




loadMap(x:number,y:number,z:number){

  if(this.mapp) {
    this.mapp.remove();
  }


  this.mapp= L.map('map', { zoomControl: false });

  var map=this.mapp.setView([x, y], z);

var GoogleHybrid = L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  attribution: 'Map data © Google',
  maxZoom: 20
});
    GoogleHybrid.addTo(map);
  

  var osm = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Map data © Google',
    maxZoom: 20
  });

var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
  denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
  aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
  golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');


var streets = L.tileLayer("", {id: 'mapbox/streets-v24', tileSize: 512, zoomOffset: -1, attribution: ""});




  var baseMaps = {
    "Street View": osm,
    "Satellite View": streets
};
  var layerControl = L.control.layers(baseMaps).addTo(map);
  // Google_map_satellite_layer

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

  public PermanentMarker = new L.Marker([1,1]);


  public accuracyCircle = new L.CircleMarker([1,1]);

  public  line:any;

drawLine(a:LocationInfo,b:LocationInfo, info:String,accuracy:number,speed:number,time:string){

var map=this.mapp;
  var myStyle = {
      "color": "blue",
      "weight": 4,
      "opacity":0.8,
      "animation": "draw-line 5s ease-in-out",
      "transition-timing-function": "ease"
      
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

      iconSize:     [8, 8], // size of the icon
      iconAnchor:   [4, 4], // point of the icon which will correspond to marker's location
});


// Convert timestamp to date
const date = new Date();

// Get the date string
const dateString = date.toLocaleDateString();
if(a.date!=dateString){
  var liveIcon = L.icon({
    iconUrl: '../../assets/as/ended.png', 
      iconSize:     [30, 30], // size of the icon
      iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
  });
} else{
var liveIcon = L.icon({
  iconUrl: '../../assets/as/newicon.png',
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15],
         // point of the icon which will correspond to marker's location
});
}
//map.removeLayer(this.publicMarker);
map.removeLayer(this.accuracyCircle);
map.removeLayer(this.PermanentMarker);
map.removeLayer(this.publicMarker);

this.publicMarker.setLatLng([a.lat, a.log]);

this.publicMarker.setIcon(liveIconOld);
map.addLayer(this.publicMarker);
var publicMarkerLive = new L.Marker([b.lat, b.log]);
publicMarkerLive.setLatLng([b.lat, b.log]);
publicMarkerLive.setIcon(liveIcon);  

if(accuracy<50)
  accuracy=0
  else
  accuracy=accuracy

var circleStyle = {
  opacity:0.4,
  fillOpacity:0.0
};  
 
  accuracy= Math.round(accuracy/1)
  var accuracyCir=new L.Circle([b.lat,b.log],accuracy).setStyle(circleStyle)
 //console.log("a  "+accuracy)

//var circle1 = L.circle([b.lat, b.log],{radius: accuracy, color:'blue',weight:.5, opacity:1,fillOpacity:0.1}).addTo(gg);

this.mapp.addLayer(accuracyCir)
//this.mapp.removeItem(L.Circle)
  speed=Math.round(speed);
  speed=Math.abs(speed);

publicMarkerLive.bindPopup(
  "Address: "+info+" "+
  "<br> Speed: "+speed+" Km/h"+

  "<br>Updated on:"+time+
  "<br>Accurate Within: "+accuracy+" meters"
  );

this.accuracyCircle=accuracyCir 
//var  marker = new L.Marker([b.lat, b.log],{icon: liveIcon});
this.mapp.addLayer(publicMarkerLive);
this.publicMarker=publicMarkerLive;

this.header.isLoadingHidded=true;
}





trackUser(emailid:any)
{
  this.liveAddress=""
  this.liveTrackingScreenMsg="none"
  this.liveTrackingMsg=""
  this.header.isLoadingHidded=false

  //var detailedView=false

  this.loadMap(23.5941,80.1376,4)
  clearInterval(this.intervalId)

  this.trackingFound=false
   this.previousCord.lat=1
   this.previousCord.log=1
   this.previousCord.point=1
   var latlngs:any[]=[[1,1],[1,1]]
  this.trackingClicked=true;
  if(this.mapp.hasLayer(this.publicMarker)){
    this.mapp.removeLayer(this.publicMarker);
    this.mapp.removeLayer(this.accuracyCircle);    
  }
  if(this.trackingStatus==true)
  {this.trackingStatus=false}
  this.start=true;
    var username=JSON.stringify(localStorage.getItem('ToTrackEmailid'))
    username =  username.replace(/[&\/\\#^+()$~%.'":*?<>{}!@]/g, '') ;
    username=username.replace(/\s/g, '')

    this.ToTrackEmailid=localStorage.getItem('ToTrackEmailid')
    this.ToTrackName=localStorage.getItem('ToTrackName')
  var LatDate:any =this.datepipe.transform(emailid.date, 'd-M-YYYY');
  var url="https://trackusdatabase-default-rtdb.asia-southeast1.firebasedatabase.app/Tracking_Data/"+username+"/"+LatDate+".json";
  var result=this.http.get(url);

  if(result){

    var data=result.subscribe(data=>{
    if (!data){
      this.mapp.removeLayer(this.publicMarker);

    this.trackingAccuracy=0;
    this.trackingStatusMsg="Tracking not available for: "+LatDate;
    this.header.isLoadingHidded=true

    this.loadMap(23.5941,80.1376,4)
    //  this.fun.openSnackBar("No tracking Data for given data.","Close");


    return;

    } 
        
var route:[number,number]=[1,1]

    const keys = Object.keys(data);
  
    const entries = Object.entries(data);
//console.log(entries);

entries.forEach(([key, value]) => {
      var locationCoord = {
        xCoordinate: value.lat, 
       yCoordinate: value.log,
       zoomL: 15,
       circle:true,
       name:"",
       country: "India",
       state: "",
       time:value.time,
       accuracy:value.accuracy,
       speed:value.speed,
       device:value.device,

  
        };
       // console.log(locationCoord)

        const date = new Date(locationCoord.time);
        var locationDate = date.toLocaleDateString();
        var  locationTime=date.getTime()
        locationDate.toString()
        var lt=locationTime+"  ||  "+locationDate
      this.currentsCord={lat: locationCoord.xCoordinate,date:locationDate, log:locationCoord.yCoordinate, point:locationCoord.zoomL,timestamp:locationCoord.time};
      this.liveTrackingMsg=this.fun.getFormatedTime(locationCoord.time)
      if(this.trackingInFun==false)
      {
        this.previousCord=this.currentsCord;
        this.trackingInFun=true
    }
  

      if(this.start==true)
            { this.start=false;
              var startIcon = L.icon({
                iconUrl: '../../assets/as/start.png',
              
                  iconSize:     [24, 24], // size of the icon
                  iconAnchor:   [10,10], // point of the icon which will correspond to marker's location
              });

        this.PermanentMarker.setLatLng([this.currentsCord.lat, this.currentsCord.log]);
        this.PermanentMarker.setIcon(startIcon);
        this.mapp.addLayer(this.PermanentMarker);

    }

    this.trackingFound=true

    if(locationCoord.accuracy>180)
      {    
        if(locationCoord.device!="browser")
         return;
      }


      
      var lt=this.fun.getFormatedTime(locationCoord.time)
    
      if(this.previousCord.lat==1){
      this.previousCord=this.currentsCord}

      var speed=  this.fun.calculateSpeedBetweenCoors(this.previousCord.lat,this.previousCord.log,this.currentsCord.lat,this.currentsCord.log,this.currentsCord.timestamp,this.previousCord.timestamp);
      var cs=speed-this.previousCoordSpeed* (1000 / 3600);
      speed=Math.round(speed);
      var a=cs/((this.currentsCord.timestamp-this.previousCord.timestamp)/1000)

      if(localStorage.getItem("isCheckedDetailedMap")=="true"){
       if(a<2.1){
     this.drawLine(this.previousCord,this.currentsCord,"Searching...",locationCoord.accuracy ,speed,lt);        
      this.SetView(this.currentsCord.lat,this.currentsCord.log,16);
      this.previousCord=this.currentsCord;
      this.previousCoordSpeed=speed;
    }
        }

      else{
        if(a<2.1){
          route=[this.previousCord.lat,this.previousCord.log]
           //  console.log(route)
          latlngs.push(route);
          this.previousCord=this.currentsCord;
          this.previousCoordSpeed=speed;
      }
    }
      //console.log("in loop")
      });
if(localStorage.getItem("isCheckedDetailedMap")=="false"){

if(latlngs.length>2){
  while(latlngs[0][0]==1){

   latlngs.shift() 
  }

}
  L.polyline(latlngs,
          {
          color: 'blue',
          weight: 4,
          opacity: 0.7,
          smoothFactor: 1
        }
          ).addTo(this.mapp)
          this.trackingStatus=true;
        //  console.log(this.currentsCord)
          var address=this.fun.locationDetails(this.currentsCord.lat,this.currentsCord.log)
          this.liveAddress=address
        //  console.log("address:"+address)
        var t=this.fun.getFormatedTime(this.currentsCord.timestamp)
        this.drawLine(this.previousCord,this.currentsCord,"address",100,0,t);  
        this.SetView(this.currentsCord.lat,this.currentsCord.log,16);

        if(LatDate==this.today){
       // console.log(false)
         this.loadLocationIntervally(username,LatDate);
        }
      }
    
  },
  error => {
    console.log(error);

  }
    );
  var todayDate=timestamp();
//alert(todayDate)
    if(LatDate.toLocaleDateString==todayDate){
      var endIcon = L.icon({
        iconUrl: '../../assets/as/end.png',
          iconSize:     [30, 30], // size of the icon
          iconAnchor:   [25, 20], // point of the icon which will correspond to marker's location
      });

      this.PermanentMarker.setLatLng([this.prevPoint.lat, this.prevPoint.log]);
    this.PermanentMarker.setIcon(endIcon);
    this.mapp.addLayer(this.PermanentMarker);
    }
    this.trackingStatus=true
     this.intervalId= setInterval(() => {
        this.trackingInFun=false
        if(this.trackingFound==true&&LatDate==this.today){
        this.loadLocationIntervally(username,LatDate);
        }
        else{
        }
      }, 7000);

  }

    else{
    }
  }

  loadLocationIntervally(username:any,LatDate:any){
    var address=this.fun.locationDetails(this.currentsCord.lat,this.currentsCord.log)
    this.liveAddress=address
   // console.log("aa"+address)
    this.header.isLoadingHidded=true
    this.currentsCord=this.previousCord
    var url='https://trackusdatabase-default-rtdb.asia-southeast1.firebasedatabase.app/Tracking_Data/'+username+"/"+LatDate+'.json?orderBy="$key"&limitToLast=1';
    var result=this.http.get(url);
    var dataa=result.subscribe(data=>{
        for (const key in data) {
          const keys = Object.keys(data);
          const entries = Object.entries(data);
          entries.forEach(([key, value]) => {        
            var locationCoord = {
            xCoordinate: value.lat, 
            yCoordinate: value.log,
            zoomL: value.zoomL,
            circle:false,
            accuracy:value.accuracy,
            speed:value.speed,
            name:"",
            country: "India",
            state: "",
            time:value.time,
            batteryP:value.batteryPer

          };

          this.ToTrackBatteryP=locationCoord.batteryP
          this.trackingAccuracy=Math.round(locationCoord.accuracy);
          const date = new Date(locationCoord.time);
          const locationDate = date.toLocaleDateString();
          locationDate.toString()      

          this.currentsCord={lat: locationCoord.xCoordinate,date:locationDate, log:locationCoord.yCoordinate, point:locationCoord.zoomL,timestamp:locationCoord.time};


         this.liveTrackingMsg=this.fun.getFormatedTime(locationCoord.time)
          
        
            this.liveTrackingStatus=true;

            this.updatedMinutesAgo=Date.now()-this.currentsCord.timestamp
          this.updatedMinutesAgo=this.updatedMinutesAgo/1000
          this.updatedMinutesAgo=this.updatedMinutesAgo/60
          this.updatedMinutesAgo=Math.round( this.updatedMinutesAgo)

          if(this.updatedMinutesAgo<1)
          this.liveTrackingScreenMsg=" Online"

          else
          if(this.updatedMinutesAgo<60)
          this.liveTrackingScreenMsg=this.updatedMinutesAgo+" minutes ago"
          else
          if(this.updatedMinutesAgo>59){
            this.liveTrackingScreenMsg=" "+Math.round(this.updatedMinutesAgo/60)+" hours"
            this.updatedMinutesAgo=this.updatedMinutesAgo%60

            if(this.updatedMinutesAgo>0){
              this.liveTrackingScreenMsg=this.liveTrackingScreenMsg+" "+this.updatedMinutesAgo+" minutes ago"
              }
              else{
                this.liveTrackingScreenMsg=this.liveTrackingScreenMsg+" ago"
              }
          }
                 var lt=""+this.liveTrackingMsg
               var address=this.fun.locationDetails(this.currentsCord.lat,this.currentsCord.log)
               this.liveAddress=address
               //  var angle=this.fun.angle(this.previousCord.lat,this.previousCord.log,this.currentsCord.lat,this.currentsCord.log)
               var speed=  this.fun.calculateSpeedBetweenCoors(this.previousCord.lat,this.previousCord.log,this.currentsCord.lat,this.currentsCord.log,this.currentsCord.timestamp,this.previousCord.timestamp);
               var cs=speed-this.previousCoordSpeed* (1000 / 3600);
               var tt=(this.currentsCord.timestamp-this.previousCord.timestamp)/1000;
               var a=0;
               if(tt<1){
                a=0;
               }else{
               var a=cs/tt;
               }
         
              if(a<2.1){
              //  console.log("ll"+a)

                  this.drawLine(this.previousCord,this.currentsCord,address,locationCoord.accuracy ,speed,lt);        
                  this.previousCord=this.currentsCord;
                  this.previousCoordSpeed=speed;
                 let aa =a.toFixed(1)

                  this.drawLine(this.previousCord,this.currentsCord,address+"<br> Acceleration: "+aa+" m/s2",locationCoord.accuracy,cs,lt);  

              //console.log(Math.round(locationCoord.speed*1)
              this.previousCord=this.currentsCord;
              }
            });
          }
        });


  }




  SetView(x:number,y:number,z:number){


    var map=this.mapp.setView([x,  y], z);


  }



  setViewCurrent(){


    var map=this.mapp.setView([this.currentsCord.lat,  this.currentsCord.log], 16);


  }

  toggleDisplayDeviceList(){

   // this.loadDeviceList()
    var a=document.getElementById("devicelist");
    if(a?.style.display=='block'){
      a.style.display='none';
    this.deviceListUp=false
    }
    else
    if(a?.style.display=='none'){
      a.style.display='block';
      this.deviceListUp=true
    }

  }

  refreshComponent(): void {
    // Mark the component for change detection
    this.cdRef.detectChanges();
  }

  loadDeviceList(){


    //console.log("loading"+localStorage.getItem('deviceList'))
    
    if(localStorage.getItem('deviceList')!=null){

      
        var temp=localStorage.getItem('deviceList')!;
      var tem= temp.split(",");

      tem.forEach(data => {

        var temm= data.split("**");

        if(temp.length>2){
        var te:Device={ name:temm[0],email:temm[1]};

        this.noDeviceFound=false
        this.devicelist.push(te);      
        }
      });
    }


  }

}

function fetchData() {
  throw new Error('Function not implemented.');
}

