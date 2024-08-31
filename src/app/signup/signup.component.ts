import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  error!:string;
  isLoading=false;
  

  constructor(private AuthSrvice:AuthService,private router:Router){}
  signupForm=new FormGroup({
    name:new FormControl('',{validators:[Validators.required]}),
    email:new FormControl('',{validators:Validators.required}),
    passwords:new FormGroup({
      password:new FormControl('',{validators:Validators.required}),
      rePassword:new FormControl('',{validators:Validators.required}),
    }),
    phone:new FormControl('',{validators:Validators.required}),
  });
   
  onSubmit()
  {
    const email=this.signupForm.value.email!
    const name=this.signupForm.value.name!
    const password=this.signupForm.value.passwords?.password!
    const rePassword=this.signupForm.value.passwords?.rePassword!
    const phone=this.signupForm.value.phone!
    this.isLoading=true
    this.AuthSrvice.signUp(name,email,password,rePassword,phone).subscribe(resData=>{
      console.log(resData);

      if(resData.message==='success')
      {
        this.isLoading=false;
        this.router.navigate(['/products'])
      }
      else{
        this.error="Register is Failed,Try Again !"
        this.isLoading=false;
      }
      
    
    // },error=>{
    //   // console.log(error.errors.msg);
      
    //   error="An Unknown Error Occured !"
    //   this.error=error;


    });
    
  }

}
