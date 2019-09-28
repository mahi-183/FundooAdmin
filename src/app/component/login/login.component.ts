import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/AdminService/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  token:string

  constructor(private adminService:AdminService,private formBuilder: FormBuilder, private router:Router, private route:ActivatedRoute,private snackBar:MatSnackBar) { }

  ngOnInit() {
    
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
   this.token = this.route.snapshot.paramMap.get('token'),
    console.log("token:"+this.token)
  }

  onSubmit() {
    try{
      this.adminService.login(this.loginForm.value).subscribe(
      response => {
        if(response['adminDetails'][0].userType == "Admin"){
          console.log("The response of login",response);
          console.log("The user Type",response['adminDetails'][0].userType)
          console.log("first name",response['adminDetails'][0].firstName);
          localStorage.setItem('token',response['token']);
          localStorage.setItem('FirstName',response['adminDetails'][0].firstName);
          localStorage.setItem('LastName',response['adminDetails'][0].lastName);
          localStorage.setItem('UserName',response['adminDetails'][0].userName);
          localStorage.setItem('Email',response['adminDetails'][0].email);
          localStorage.setItem('UserId',response['adminDetails'][0].id);
          localStorage.setItem('Image',response['adminDetails'][0].image);
          this.snackBar.open(
            "login Successfull",
            "undo",
            { duration: 5000 }
            )
          this.router.navigate(['/dashboard']);
        }
        else{
          console.log("please login with admin");
        }
     
      },
      err =>
      {
        this.snackBar.open(
        "login not Successful",
        "undo",
        { duration: 5000 }
        )
        console.log("err", err);
      })
    }catch(error){
      console.log("error",error);
    }
    }
}
