import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm : FormGroup ; 
private loginCridits : {username : string , password : string}
  constructor(private http : HttpClient) { 

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup ({
      'username' : new FormControl(null , Validators.required),
      'password' : new FormControl(null ,[ Validators.required  , Validators.minLength(6) ] )
    })
    this.loginCridits = {username : "", password : ""};

  }

  loginSubmit(){
    
    
    
    this.loginCridits.username = this.loginForm.controls['username'].value;
    this.loginCridits.password = this.loginForm.controls['password'].value;
    
    //  this.http.post('https://crmproject-558a8-default-rtdb.europe-west1.firebasedatabase.app/things.json'
    //  , this.loginCridits).subscribe(Response => {
    //    console.log(Response);
  
    //  })
   }
   isValidPassword(){
     console.log(this.loginForm);
     
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
