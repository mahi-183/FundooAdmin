import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { AdminService } from 'src/app/service/AdminService/admin.service';

/**
 * interface for column field
 */
export interface PeriodicElement {
  FirstName : string;
  LastName: string;
  UserId: string;
  UserName: string;
  UserType: number;
}

/**
 * get the 
 */
// const ELEMENT_DATA: PeriodicElement[] = [];

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
  displayedColumns: string[] = ['FirstName', 'LastName', 'UserName','UserType'];
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
   * get all user list 
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

  getAllUser(){
    this.adminService.getAllUser().subscribe(response=>{
      console.log("resposne user",response['userDetails']);
      this.userList = response['userDetails'];
      console.log("userList of response",this.userList)
    })
  }
}
