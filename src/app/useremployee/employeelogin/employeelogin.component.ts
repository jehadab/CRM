import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { EmployeeAuth } from "./employeeauth.service";

@Component({
  selector: 'app-employeelogin',
  templateUrl: './employeelogin.component.html',
  styleUrls: ['./employeelogin.component.css']
})
export class EmployeeloginComponent implements OnInit {

  loginForm : FormGroup ; 
  isLoading : boolean  = false ;
  private loginCridits : {username : string , password : string}
    constructor(
      private http : HttpClient,
      private router : Router,
      private employeeAuth : EmployeeAuth
      ) { 
  
    }
  
    ngOnInit(): void {
      this.loginForm = new FormGroup ({
        'username' : new FormControl(null , Validators.required),
        'password' : new FormControl(null ,[ Validators.required  , Validators.minLength(6) ] )
      })
      this.loginCridits = {username : "", password : ""};
  
    }
  
    loginSubmit(){
      
      
      
      this.isLoading = true;
      this.loginCridits.username = this.loginForm.controls['username'].value;
      this.loginCridits.password = this.loginForm.controls['password'].value;
  

      this.employeeAuth
      .login(this.loginCridits.username , this.loginCridits.password)
      .subscribe(resault => {
        // console.log('done');
        this.isLoading = false
        this.router.navigate(['employee'])
        
      },errorMessage =>{
        this.isLoading = false ;
        // console.log("err");
        
      });
      
      //  this.http.post('https://crmproject-558a8-default-rtdb.europe-west1.firebasedatabase.app/things.json'
      //  , this.loginCridits).subscribe(Response => {
      //    console.log(Response);
    
      //  })
     }
     isValidPassword(){
      //  console.log(this.loginForm);
       
       if(this.loginForm.get('password').hasError('minlength')){
         if(this.loginForm.get('password').invalid
         && this.loginForm.get('password').touched
         ){
          return false ;
          
         }
       }
       
      this.loginForm.get('password').markAsUntouched()
      return true;
     }


}
