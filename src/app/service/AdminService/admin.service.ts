import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpService:HttpService) { }
  
  login(data){
    console.log("inside user service",data)
   return this.httpService.post('Admin/AdminLogin',data)
  }

  userStatistics(){
    return this.httpService.get('Admin/UserStatistics');
    
  }

  getAllUser(){
    return this.httpService.get('Admin/getUsers');
  }
}
