import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { AdminService } from 'src/app/service/AdminService/admin.service';

/**
 * interface for column field
 */
export interface PeriodicElement {
  FirstName : string;
  LastName: string;
  mail:string;
  UserId: string;
  UserName: string;
  UserType: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  Image;
  basicCount;
  result;
  advanceCount;
  userList;
  
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['FirstName', 'LastName', 'Email','UserName','UserType'];
  searchValue: string;
  filteredArray: any;
  users: any;
  constructor(private route:Router,private adminService:AdminService) { }

  ngOnInit() {
    this.Image = localStorage.getItem('Image');
  //  this.userList.paginator = this.paginator;
    this.userstatics();
    this.getAllUser();
  }

  /**
   * sign out the admin
   */
  signOut(){
    this.route.navigate(['/login']);
  }
  
  /**
   * get the basic and advance count 
   */
  userstatics(){
    console.log("inside the userstatistics");
    this.adminService.userStatistics().subscribe(response=>{
      console.log("response",response['result']);
      this.result = response['result'];
      this.basicCount = response['result'].basic;
      this.advanceCount = response['result'].advanced;
    })
  }

  /**
   * get all user list
   */
  getAllUser(){
    this.adminService.getAllUser().subscribe(response=>{
      console.log("resposne user",response['userDetails']);
      this.userList = response['userDetails'];
      this.filteredArray = this.userList;
      console.log("userList of response",this.userList)
    })
  }

  search(event:any){
    this.searchValue = event.target.value +'\n';
    console.log("search value",this.searchValue);
    this.searchValue = this.searchValue.trim();
    if(this.searchValue!=undefined && this.searchValue!=null && this.searchValue!='')
    {
      this.filteredArray = this.filterUser(this.userList,this.searchValue);
      console.log("filtered array", this.filteredArray);
    }
    else
    {
      this.filteredArray= this.userList;
    }
  }

  filterUser=(userArray, searchValue)=>{
   this.users = userArray.filter(item=>{
     return item.email.toLowerCase().startsWith(searchValue.toLowerCase());
   })
   return this.users;
  }
}
