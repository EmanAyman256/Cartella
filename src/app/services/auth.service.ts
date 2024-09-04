import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { LoginResponse, SignupResponse } from '../models/Auth.model';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private router:Router) { }
  u!:User
  user=new BehaviorSubject<User|null>(null)
  isAuthenticated(): boolean {
    const token = localStorage.getItem('userToken');
    return !!token; // Or more advanced validation
  }
  signUp(name:string,email:string,password:string,
    rePassword:string,phone:string):Observable<SignupResponse>
  {
    return this.http.post<SignupResponse>("https://ecommerce.routemisr.com/api/v1/auth/signup",{
      name:name,
      email:email,
      password:password,
      rePassword:rePassword,
      phone:phone
    }).pipe(tap(res=>{
      const usertoken=new User(res.token);
      this.user.next(usertoken)
    }));
  }
  Login(email:string,password:string):Observable<LoginResponse>
  {
    return this.http.post<LoginResponse>("https://ecommerce.routemisr.com/api/v1/auth/signin",
    {
      email:email,
      password:password
    }
   ).pipe(tap(res=>{

    const user=new User(res.token);
      this.user.next(user)

   }))
  }
  LogOut()
  {
    localStorage.removeItem('userToken')
     this.user.next(null);
  }
}

