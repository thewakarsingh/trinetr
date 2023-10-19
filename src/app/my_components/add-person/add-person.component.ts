import { Component, OnInit, Inject} from '@angular/core';
import {  Router } from '@angular/router';
import {SupportFunctions} from 'src/app/my_components/map/supportFiles'
import { HttpClient} from '@angular/common/http'
import{HeaderComponent} from '../header/header.component'
import { Location } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard'; 
@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
 
 
  public acessCodeError: string="";
 
  private otpAttempts: number=3

  constructor(

    private clipboard: Clipboard,
    public head:HeaderComponent,
    public router:Router,
    public http:HttpClient,
    private fun:SupportFunctions,
    private location : Location
    
    ) {
      
     }

  ngOnInit(): void {
    
  }

  addPerson(val:any){
    const a: string | null=localStorage.getItem("username")
    var key=localStorage.getItem("databaseKey")
    var tempE="";
    if(a!=null){
   tempE =  a.replace(/[&\/\\#^+()$~%.'":*?<>{}!@]/g, '') ;
   tempE=tempE.replace(/\s/g, '')
    }
    var accessCode=val.accesscode
    var emailE=val.emailid.toLowerCase()
    var e=emailE
    e=e.replace(/[&\/\\#^+()$~%.'":*?<>{}!@]/g, '');
    e=e.replace(/\s/g, '')
    var url="https://trackusdatabase-default-rtdb.asia-southeast1.firebasedatabase.app/users/"+e+"/access_code.json";
           var result=this.http.get(url);
               result.subscribe(data=>{
                if(data==accessCode){
                  localStorage.setItem('ToTrackName',val.name);
                  localStorage.setItem('ToTrackEmailid',emailE);
                  var temp=localStorage.getItem('deviceList')!;
                  if(temp!=""){
                  temp=temp+","+val.name+"**"+emailE;
                  }
                  else{
                  temp=val.name+"**"+emailE;
                  }
                  localStorage.setItem('deviceList',temp);
                  var url="https://trackusdatabase-default-rtdb.asia-southeast1.firebasedatabase.app/trinetrUsers/"+tempE+"/"+key+"/"+key+".json";
                  var deviceList={
                    deviceList:temp
                  }
                  var res=this.http.post(url,deviceList);
                  res.subscribe(data=>{var a=2;});
                  this.router.navigate(["home/tracker"]);
                  this.fun.openSnackBar(emailE+ " Added successfully. " ,"Close");               
                }
                else{
                  if(this.otpAttempts<=1){
                    this.location.back();
                  }
                  this.otpAttempts--;
                  this.acessCodeError="Email Id and Access Code did Not Matched: \n  "+this.otpAttempts+" attempt left *";
                }
            });


  }


  share() {




    if(navigator.share){

      const shareData = {
        title: 'Trackify App',
        text: 'Share Trackify App',
        url: this.head.trackifyAndroidLink, // Replace with the URL you want to share
      };
    
      navigator.share(shareData)
        .then(() => {
          console.log('Shared successfully');
        })
        .catch((error) => {
          console.error('Error sharing:', error);
        });

    }

    else{
      this.copyDownloadLink();
      window.open(this.head.trackifyAndroidLink);
    }


   
  }

  copyDownloadLink(){
    this.clipboard.copy(this.head.trackifyAndroidLink)
    this.fun.openSnackBar("Download link copied." ,"Close");               
  }
  
}
