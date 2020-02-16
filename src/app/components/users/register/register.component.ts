

import { Component, ElementRef, ViewChild} from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {
 
  //Lo que da más problemas es no inicializar un string, y si es un objeto o array tambien da problemas no ponerle anque sea esto [] {}
  /* Advertencia: Por poner las variables asi, no me cargaba la url de la imagen,
   se rompia el codigo de más abajo en alguna parte, hay que inicializar el tipo de dato si van a ser usadas por un form y prestar atención a las advertencias del ide
   
   email
  password
  
  *En resumen se recomienda inicializar todas las variables por las dudas, más si solamente van a ser usadas del lado del html solamente
  */
  @ViewChild('imageUser', { static: true }) inputImageUser: ElementRef;

  email = ""
  password = ""
  uploadPercent: Observable<number>
  urlImage: Observable<string>

  constructor(private authService: AuthService, private router: Router, private storage: AngularFireStorage) { }

  onUpload(e:any) {

    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);


    this.uploadPercent = task.percentageChanges();
 task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe()

    //coloco el pipe para meter una operacion con el operador rxjs y cuando se complete, de error o finalice las subscripcion se ejecutara el codigo dentro del finalize
    //En este caso cuando se suba la imagen, obtendremos su url 

  }
//Nota: Comunmente la imagen de usuario se cambia despuès, cuanod se loguea, no cuando se registra, pero bueno...
  onAddUser() :void{
    /* Explicaciòn mètodo ->
  Si la registración es correcta se loguea automaticamente porque isLogued del navbar component pasa a ser true,
  despues esperamos a isAuth para que nos devuelva el objeto user.
  Si este existe (osea no es null) se cambia el profile de este, la url de su imagen, y si todo esto se hace correctamente
  se redirige a la lista de libros.
  El subscribe de isAuth puede devolvernos un user=null o el objeto valido
    */
    this.authService.registerUser(this.email, this.password)
      .then((res) => {
       this.authService.isAuth().subscribe(user => {
          if (user) {
            user.updateProfile({
              displayName: '',
              photoURL: this.inputImageUser.nativeElement.value
            }).then(() => {
              console.log('USER UPDATED', user)
              this.onLoginRedirect(), err => this.onLoginError(err)
            })
          }
        })
      }).catch(err => console.log('err', err.message));
  }

  onLoginGoogle():void {
    this.authService.loginGoogleUser()
      .then(() => this.onLoginRedirect()
        , err => this.onLoginError(err))

  }


  onLoginFacebook():void {

    this.authService.loginFacebookUser()
      .then(() => this.onLoginRedirect)
      .catch(err => this.onLoginError(err))

  }
  onLoginRedirect():void {
    this.router.navigate(['admin/list-books'])
  }
  onLoginError(err:any):void {
    console.log(err.message)
  }
 
}
