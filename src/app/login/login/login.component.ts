import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { jwtDecode } from 'jwt-decode';
import { catchError, Subject, throwError } from 'rxjs';
import { CustomJwtPayload } from 'src/app/models/Token.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  error!:string
  constructor(private Authservice:AuthService,private router:Router){}
  loginForm=new FormGroup({
    email:new FormControl("",[Validators.required,Validators.email]),
    password:new FormControl("",[Validators.required,Validators.minLength(6)])});
  isLoading=false;
  isSubmitted=false;

  get emailIsInvalid()
  {
    return(
      this.loginForm.controls.email.touched &&
      this.loginForm.controls.email.dirty &&
      this.loginForm.controls.email.invalid
    )
  }
  get passwordIsInvalid()
  {
    return(
      this.loginForm.controls.password.touched &&
      this.loginForm.controls.password.dirty &&
      this.loginForm.controls.password.invalid
    )
  }

  onSubmit()
  {
    const email=this.loginForm.value.email!;
    const password=this.loginForm.value.password!
    
    this.Authservice.Login(email,password).pipe(
      catchError((error:HttpErrorResponse)=>{
          this.error=error.message
          return throwError(() => new Error(error.message));
      })
    ).subscribe((resData)=>{
      this.isLoading=true;
      const AdminAccess:CustomJwtPayload=jwtDecode(resData.token)
      const AdminId=AdminAccess.id
  //  const Admin= localStorage.setItem("AdminId",AdminId)!
  
    
      if(resData.message==='success')
      {
        this.isLoading=false;
        localStorage.setItem('userToken',resData.token)
        if(AdminId==="66ddc1ef1edf433558a01258")
        {
          Swal.fire({title:"Great !",text:"Admin Logged In Successfully",icon:'success'});

          this.router.navigate(["/admin"])
        }
        else{
          Swal.fire({title:"Great !",text:"You Logged In Successfully",icon:'success'});

          this.router.navigate(["/products"])
        }
      }
      else
      {
        console.log(resData);
        this.isLoading=false;
      }
    })
    
  }

}