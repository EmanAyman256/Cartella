import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(private Authservice:AuthService,private router:Router){}
  loginForm=new FormGroup({
    email:new FormControl("",{validators:Validators.required}),
    password:new FormControl("",{validators:Validators.required}),
  })
  isLoading=false;

  onSubmit()
  {
    const email=this.loginForm.value.email!;
    const password=this.loginForm.value.password!
    this.isLoading=true;

    this.Authservice.Login(email,password).subscribe((resData)=>{
      if(resData.message==='success')
      {
        
        this.isLoading=false;
        this.router.navigate(['/products'])
      }
      else
      {
        console.log(resData);
        this.isLoading=false;
      }
    })
    
  }

}
