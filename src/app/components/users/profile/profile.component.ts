import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from '../../../models/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
 
  
user:UserInterface={} //se recomienda inicializar asi, o sus propiedades en blanco para evitar errores en la vista o modelo, como la propiedad es indefinida, etc.
/* otra alternativa
user:UserInterface={
  name:'',
  email:'',
  photoUrl:'',
  roles:{}
}
*/
  constructor(private authService:AuthService) { }
providerId=""
  ngOnInit() {
   this.authService.isAuth().subscribe(user=>{
      console.log('USER ',user)
      if(user){
        //Si el usuario ha sido creado o logueado a través de una red social se va a mostrar la imagen y nombre del usuario
        this.user.name=user.displayName
        this.user.email=user.email
        this.user.photoUrl=user.photoURL

        //si sale google.com o facebook.com es de red social, si sale password fue con email y password
this.providerId=user.providerData[0].providerId

        console.log('USER',this.providerId)
      }

      
    })
   
     
  }

}
