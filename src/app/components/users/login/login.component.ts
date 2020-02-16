import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  //Acordarse de usar el tipado fuerte también en metodos e iniciarlizar variables
email=""
password=""
  constructor(private router:Router, private authService:AuthService) {
  }

 
 onLogin():void{
   this.authService.loginEmailUser(this.email,this.password).
   then((userData)=>{
     this.onLoginRedirect()
    console.log('Login->userData: ',userData)}
   ,err=>this.onLoginError(err))
 }
  onLoginGoogle():void {
 this.authService.loginGoogleUser()
 .then(()=>this.onLoginRedirect()
 ,err=>this.onLoginError(err))

    }

  onLogoutGoogle():void {
this.authService.onLogout()
  }
  onLoginFacebook(){

this.authService.loginFacebookUser()
.then(()=>this.onLoginRedirect)
.catch(err=>this.onLoginError(err))
  
  }
  onLoginRedirect():void{
    this.router.navigate(['admin/list-books'])
    
  }
  onLoginError(err:any){
    console.log(err.message)
  }
}
