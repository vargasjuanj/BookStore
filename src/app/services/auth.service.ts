import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

import { auth } from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserInterface } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth, private afs:AngularFirestore) { }
  registerUser(email:string,pass:string) {
return this.afsAuth.auth.createUserWithEmailAndPassword(email,pass)
.then(userData=>this.updateUserData(userData.user),
err=>console.log('err ',err))
  }
  loginEmailUser(email:string,pass:string) {  //se puede simplificar pero es a modo educativo
return new Promise((resolve,reject)=>{
  this.afsAuth.auth.signInWithEmailAndPassword(email,pass).then(userData=>resolve(userData)
  ,err=>reject(err)) 
  //el resolve devuelve el resultado del then, lo correcto
  //En vez de usar el catch ponermos coma en el then como segundo parametro
})
   }
  loginFacebookUser(){
    return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
    .then(userData=>this.updateUserData(userData.user))
  }
  loginGoogleUser() { //cuando uno se loga en una red social el objeto que se encuentra en el response contiene la informacion del usuario
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    .then(userData=>this.updateUserData(userData.user))
  }

  isAuth() {
    return this.afsAuth.authState
  }
  onLogout() {
    this.afsAuth.auth.signOut()

  }

  //Cuando el user esta logueado o registrado por red social, no me carga inmediatamente los libros, debo recargar la pagina
private updateUserData(user:any){
  const userRef:AngularFirestoreDocument<any>=this.afs.doc(`users/${user.uid}`)
const data:UserInterface={
  id:user.uid,
  email:user.email,
  roles:{
  editor:true
  }
}
return userRef.set(data,{merge:true}) //set with merge actualizará los campos en el documento o lo creará si no existe
//https://stackoverflow.com/questions/46597327/difference-between-set-with-merge-true-and-update

}
isUserAdmin(userUid:string){
return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges()
}
}
