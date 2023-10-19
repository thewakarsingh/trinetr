import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import{AppUser} from '../../Models/user'

//uncomment to send email using emailJS
//import emailjs, { EmailJSResponseStatus } from '@emailjs/browser'

import { Router } from '@angular/router';

import { timeout } from 'rxjs';

@Component({

  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public inputEmail: string = '';
  public isOtpSent: boolean = false;

  isResendDisabled = true;
  countdown = 60;

  public otpAttempts=3;
  public otpErrorMSG=""
  public isLoadingHidded=true
  public isInputEmailDisabled=true;
  public emailSentMSG=""
  enteredOTP="";
  public errorMSG="";
  public CurrentOTP=1;


  sendEmail(recipient: string, subject: string, textContent: string) {
    const req = {
      to: recipient,
      subject: subject,
      text: textContent,
    };

    return this.http.post('https://com-trinetr-trinetrapp.onrender.com/send-email', req)

    //return this.http.post('http://128.168.178.68.host.secureserver.net:3000/send-email', req)

   // return this.http.post('http://localhost:3000/send-email', req)

  }

  constructor(
    private router: Router,
    private http: HttpClient,
    ) { 


}

  ngOnInit(): void {
    if(localStorage.getItem('username')!=null){
      this.router.navigate(["/home/tracker"]);
      var e=""+localStorage.getItem('username')
      sessionStorage.setItem('username',e)
    }
    else{
      this.router.navigate(["/login"]);
    }

}
 sendOTP(){

  this.countdown = 60;
	this.isOtpSent=false;

    this.errorMSG="";
    this.otpAttempts=3;
    this.otpErrorMSG="";
    this.isInputEmailDisabled=true;
    this.emailSentMSG=""
    this.isLoadingHidded=false;
    var otp= Math.floor(100000 + Math.random() * 899999);
    this.CurrentOTP=otp;

  this.sendEmail(this.inputEmail,"Trinetr OTP", otp+"  is your OPT to login to Trinetr app.").subscribe(success => {
      this.isInputEmailDisabled=false;
      this.emailSentMSG="An OTP has been sent to your email Id."
      this.isOtpSent=true
      this.isLoadingHidded=true;
    }, error => {
      
      this.isLoadingHidded=true;

      this.errorMSG="* Please enter correct email Id *"
  });

  this.isResendDisabled = true;
    
  const timer = setInterval(() => {
    if (this.countdown > 0) {
      this.countdown--;
    } else {
      clearInterval(timer);
      this.isResendDisabled = false;
      this.countdown = 60; // Reset the countdown for future use
    }
  }, 1000);


      }


  verifyOTP() {
    this.isLoadingHidded=false;
    if(this.CurrentOTP==Number(this.enteredOTP)){
      var a:AppUser={
        name: '',
        uniqueId: "",
        profilePic:"",
        deviceList:"",  
        emailid:this.inputEmail,
        password:""
      };

      localStorage.setItem('username',this.inputEmail);

      var temp=this.inputEmail;
      temp =  temp.replace(/[&\/\\#^+()$~%.'":*?<>{}!@]/g, '') ;
      temp=temp.replace(/\s/g, '')
     
      var url="https://trackusdatabase-default-rtdb.asia-southeast1.firebasedatabase.app/trinetrUsers/"+temp+".json";
     // console.log(url)
      var result=this.http.get(url);
      result.subscribe(data=>{

      //  console.log(data);
        var databaseKey:any;

        if(!data){
          var url="https://trackusdatabase-default-rtdb.asia-southeast1.firebasedatabase.app/trinetrUsers/"+temp+".json";
          var res=this.http.post(url,a);
          res.subscribe(data=>{var a=2;});
          localStorage.setItem('username',this.inputEmail);

          var url="https://trackusdatabase-default-rtdb.asia-southeast1.firebasedatabase.app/trinetrUsers/"+temp+".json";
         // console.log(url)
                var result=this.http.get(url);

                const keys = Object.keys(data);
  
                const entries = Object.entries(data);
            
            entries.forEach(([key, value]) => {
              localStorage.setItem('databaseKey',key)
              databaseKey=key
      
               });
        }
        else{


          const keys = Object.keys(data);
          const entries = Object.entries(data);
      //console.log(entries);
      entries.forEach(([key, value]) => {
        localStorage.setItem('username',value.emailid);
        localStorage.setItem('username',value.emailid);
        localStorage.setItem('databaseKey',key)

        databaseKey=key

         });
    }

    var url='https://trackusdatabase-default-rtdb.asia-southeast1.firebasedatabase.app/trinetrUsers/'+temp+"/"+databaseKey+"/"+databaseKey+'.json?orderBy="$key"&limitToLast=1';

    var result=this.http.get(url);
    
    var dataa=result.subscribe(data=>{

     // console.log(data);

        for (const key in data) {
        
          const keys = Object.keys(data);
        
          const entries = Object.entries(data);
          
          entries.forEach(([key, value]) => {

            localStorage.setItem('deviceList',value.deviceList)

          });
        }

    
  });//

  });

       
  setTimeout(() => {
    this.router.navigate(["/home/tracker"]);

    }, 100);
  }
  
  else{
    if(this.otpAttempts<=1){
      this.isLoadingHidded=false;
      window.location.reload();
    }
    this.otpAttempts--;
    this.otpErrorMSG="* Wrong OTP: "+this.otpAttempts+" attempt left *";
    this.isLoadingHidded=true;
  }
  }

 guestLogin(){

	var a= Math.floor(1000 + Math.random() * 9999);
	
	var emailA ="guest"+a+"@trinetr.com";

 	localStorage.setItem('username', emailA);

     	 this.router.navigate(["/home/tracker"]);


}
}