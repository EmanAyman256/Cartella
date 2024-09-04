import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
function equalValue(control:AbstractControl)
{
  const password=control.get('password')?.value;
  const confirmPassword=control.get('rePassword')?.value;
  if(password===confirmPassword)
  {
    return null;
  }
  return{NorEqualValues:true}
}
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
    name:new FormControl('',{validators:[Validators.required,Validators.minLength(3),Validators.maxLength(12)]}),
    email:new FormControl('',{validators:[Validators.required,Validators.email]}),
    passwords:new FormGroup({
      password:new FormControl('',{validators:[Validators.required,Validators.minLength(6)]}),
      rePassword:new FormControl('',{validators:[Validators.required,Validators.minLength(6)]}),
    },   {validators:[equalValue]}
  ),
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
    this.AuthSrvice.signUp(name,email,password,rePassword,phone).pipe(
      catchError((error:HttpErrorResponse)=>{
          this.error=error.message
          this.isLoading=false        
          return throwError(() => new Error(error.message));
      })
    ).subscribe(resData=>{
      console.log(resData);

      if(resData.message==='success')
      {
        Swal.fire({title:"Great !",text:"You Signed Up Successfully,Login Now",icon:'success'});

        this.isLoading=false;
        this.router.navigate(['/login'])
      }
      else{
        this.isLoading=false;
      }
      
    
    // },error=>{
    //   // console.log(error.errors.msg);
      
    //   error="An Unknown Error Occured !"
    //   this.error=error;


    });
    
  }

}
