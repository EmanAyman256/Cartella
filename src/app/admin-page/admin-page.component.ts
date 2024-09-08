import { Component, OnInit } from '@angular/core';
import { ApidataService } from '../services/apidata.service';
import { UserInfo } from '../models/UsersInfo.model';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  users!:UserInfo
constructor(private UserData :ApidataService){}
ngOnInit() {
  this.UserData.getAllUsers().subscribe(data=>{
    this.users=data
    console.log(this.users);
    
  })
  
}
}
