

export class User {

    constructor(
      public name:string,
      public email:string,
      public password:string
      ){}
        
  }


  export  interface AuthUser {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
}

  export interface LocationInfo {
    lat : number,
    log:number,
    date:string,
    point: Number,
    timestamp:number
  }

  const li: LocationInfo={
    lat : 1,
    log:1,
    date:"",
    point: 1,
    timestamp:0
  }


  interface Person {
    name: string;
    age: number;
  }


  export interface AddressInfo{
    
    speed:number,
    dir:number,
    name:string,
    state: string,
    country: string,
    }

  export interface line {
    lat : number,
    log:number,
    point: Number
  }

  export  interface AppUser {
    name: string;
    emailid:string;
    password: string;
    uniqueId: string;
    profilePic:string;
    deviceList:string;
}
