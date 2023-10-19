import { Component, Injectable, OnInit } from '@angular/core';

import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http'
import { TrackerComponent } from './tracker.component';
import { LocationInfo, User } from '../../Models/user';
import * as geojson from 'geojson';
import * as L from 'leaflet';


@Injectable ()

export class MapFunctions {


    constructor(private _snackBar:MatSnackBar, private http:HttpClient, private tc:TrackerComponent){

        

        
    }
    ngOnInit(): void {

        throw new Error('Method not implemented.');
    }



drawLine(a:LocationInfo,b:LocationInfo, info:String,accuracy:number,speed:number,time:string){


    var map=this.tc.mapp;
      var myStyle = {
          "color": "blue",
          "weight": 4,
          "opacity":0.8,
          "animation": "draw-line 5s ease-in-out"

          
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
      }).addTo(this.tc.mapp);
    
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
          iconAnchor:   [4, 4], // point of the icon which will correspond to marker's location
      });
        
    } else{
    var liveIcon = L.icon({
    
    
      iconUrl: '../../assets/as/newicon.png',
    
        iconSize:     [30, 30], // size of the icon
        iconAnchor:   [4, 4], // point of the icon which will correspond to marker's location
    });
    
    }
    
    //map.removeLayer(this.publicMarker);
    
    map.removeLayer(this.tc.accuracyCircle);
    
    
    this.tc.publicMarker.setLatLng([a.lat, a.log]);
    
    
    this.tc.publicMarker.setIcon(liveIconOld);
    map.addLayer(this.tc.publicMarker);
    
     map.addLayer(this.tc.publicMarker);
    
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
    
    this.tc.mapp.addLayer(accuracyCir)
    //this.mapp.removeItem(L.Circle)
    
    publicMarkerLive.bindPopup(
      "Address: "+info+" "+
      "<br> Speed: "+Math.round(speed*3.6)+" Km/h"+
    
      "<br>Updated on:"+time+
      "<br>Accurate Within: "+accuracy+" meters"
      );
    
    this.tc.accuracyCircle=accuracyCir 
    //var  marker = new L.Marker([b.lat, b.log],{icon: liveIcon});
    this.tc.mapp.addLayer(publicMarkerLive);
    this.tc.publicMarker=publicMarkerLive;
    
    }





  SetView(x:number,y:number,z:number){


    var map=this.tc.mapp.setView([x,  y], z);





  }
  setViewCurrent(){


    var map=this.tc.mapp.setView([this.tc.currentsCord.lat,  this.tc.currentsCord.log], 16);


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

    L.geoJSON(vLine).addTo(this.tc.mapp);
    L.geoJSON(hLine).addTo(this.tc.mapp);

  }











  loadMap(x:number,y:number,z:number){


    if(this.tc.mapp) {
      this.tc.mapp.remove();
    }
  
  
    this.tc.mapp= L.map('map', { zoomControl: false });
  
    var map=this.tc.mapp.setView([x, y], z);
  
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
  
  //
  
  
  
  }





  refreshMap(){

    if(this.tc.mapp) {
      this.tc.mapp.remove();
    }
  

    var map=this.tc.mapp.setView([85, 23], 10);

  }

  


  }
