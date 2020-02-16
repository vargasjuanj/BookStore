import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
app_name="BookStore"
isLogged=false
  constructor(private authService: AuthService, afsAuth:AngularFireAuth) { }

  ngOnInit() {
    this.getCurrentUser()
  }
  getCurrentUser(){
    this.authService.isAuth().subscribe(auth=>{
      if(auth){
        console.log('user logged')
        this.isLogged=true
        return
      }
        console.log('NOT user logged')
        this.isLogged=false
      
    })
  }
onLogout(){
  this.authService.onLogout()
}
}

