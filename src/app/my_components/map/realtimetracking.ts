import { Component, Injectable, OnInit, } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http'
import { interval, merge,from, of,retry, throwError, concatAll, concat, timer, catchError, map,tap } from 'rxjs';
import { LocationInfo, User } from '../../../app/Models/user';
import { variable } from '@angular/compiler/src/output/output_ast';
import * as geojson from 'geojson';
//import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


@Injectable ()


export class  RealtimeTracker{


  
  
    constructor(private http: HttpClient) {

        var locationa={lat:Number,lon:Number,point:Number};

        var previousPoint:LocationInfo={lat:1,log:1,date:"",point:1,timestamp:0};
        var initialPosion=previousPoint;
    
     }


     writeCurrentPosion(){

        navigator.geolocation.getCurrentPosition(resp => {

            var position={lng: resp.coords.longitude, lat: resp.coords.latitude};

            var url='';

            this.http.post(url,position);


          });
      }

      readCurrentPosion(){


        var url="https://trackusdatabase-default-rtdb.asia-southeast1.firebasedatabase.app/";

        var res=this.http.get(url);
        console.log("hello");
        console.log(res); 
        var dataa=res.subscribe(data=>console.log("From server Firebase:"+ data));
        console.log(dataa);


        // var url='https://api.openweathermap.org/data/2.5/forecast/daily?lat='+res.lat+'&lon='+res.lng+'&appid=3b5a27eca817cf9eac1374c7d17b546c&units=metric';

        // var resultW=this.http.get(url);
        // resultW.subscribe(data=>{

        //     var locationa={lat:Number,lon:Number,point:Number};


      
            // });
  


        




      }







     }