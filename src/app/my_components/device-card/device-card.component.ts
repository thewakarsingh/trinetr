import { Component,Input, OnInit} from '@angular/core';
import { Device } from 'src/app/Models/general';
import {  Router } from '@angular/router';
import { TrackerComponent } from '../tracker/tracker.component';
import { DatePipe } from '@angular/common'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.css']
})
export class DeviceCardComponent implements OnInit {

  @Input()device: Device = new Device;


private todayedate:any


  private b:object={
    date:new Date()
  }

  
  constructor(

    private http:HttpClient,
    public tracker:TrackerComponent,
    public router:Router,

  ) {



    
   }

  ngOnInit(): void {
  
  }

  changeCurrentDevice(name:string,emaild:string){
    localStorage.setItem('ToTrackName',name);
    localStorage.setItem('ToTrackEmailid',emaild);
console.log(name)
    var bo:object={
      date:this.todayedate
    }

   // console.log(bo)
    this.tracker.trackUser(this.b)

    this.tracker.toggleDisplayDeviceList()

    

    
  }

  deleteDevice(name:string,email:string){


    const searchTerm = name+"**"+email; // String to search for and delete

   var aa= localStorage.getItem('deviceList')
    aa=aa+""
    if(aa.includes(searchTerm+",")){
      aa= aa.replace(searchTerm+",", ',');
      }
   
    else
    if(aa.includes(","+searchTerm)){

      aa= aa.replace(","+searchTerm, '');

    }
   
    else
    if(aa.includes(searchTerm)){

      aa= aa.replace(searchTerm, ',');

    }


 localStorage.setItem('deviceList',aa)

 const a: string | null=localStorage.getItem("username")

    var key=localStorage.getItem("databaseKey")
    var tempE;
    if(a!=null){
   tempE =  a.replace(/[&\/\\#^+()$~%.'":*?<>{}!@]/g, '') ;
   tempE=tempE.replace(/\s/g, '')
    }

    var url="https://trackusdatabase-default-rtdb.asia-southeast1.firebasedatabase.app/trinetrUsers/"+tempE+"/"+key+"/"+key+".json";
    var deviceList={
      deviceList:aa
    }
    var res=this.http.post(url,deviceList);
    res.subscribe(data=>{var a=2;});

 var element = document.getElementById(email);
 console.log(email)
 if(element!==null)
element.remove();


//alert(name+  " Deleted Sucessfully");


  }

}
