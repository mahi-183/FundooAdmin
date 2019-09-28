import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = environment.BaseUrl;

  constructor(private http:HttpClient) { }
  /**
   * add new user
   * @param url backurl
   * @param data data for registrered user
   */
  post(url, data)
  {
    console.log("data in http ",data);
    
    let option = {
      headers: new HttpHeaders({
        'Authorization' : 'bearer ' + localStorage.getItem('token'),
        'content-Type' : 'application/json'
        }) 
    }  
    return this.http.post(this.baseUrl + url, data, option);
  }

  /**
   * get the user list like basic and advance
   * @param url back url
   */
  get(url){
    console.log("data in http ",url);
    
    let option = {
      headers: new HttpHeaders({
        'Authorization' : 'bearer ' + localStorage.getItem('token'),
        'content-Type' : 'application/json'
        }) 
    }  
    return this.http.get(this.baseUrl + url,option);
  }
}
