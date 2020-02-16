import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private afsAuth: AngularFireAuth, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//El take toma el primer valor que devuelve el observable
//el map modifica ese valor
//el tap agarra el valor actual del observable y realiza operaciones, pero no lo puede modificar
//el pipe va concatenando los resultados de los operadores
//En la doble negación si se recibe un null seria falso  
return this.afsAuth.authState.pipe(take(1)) //verifica el estado actual de loguin
      .pipe(map(authState => !!authState)) //devuelve true o false según si hay usuario logueado. Este es el verdadero retorno, el tap hace ramificación
      .pipe(tap(auth => { //Realiza como una ramificación y según el resultado anterior, si es nulo redirige al login
        if (!auth) { 
          this.router.navigate(['/user/login']);
        }
      }));
  
    }

  /* Doble negación -> http://deckerix.com/blog/el-truco-de-la-doble-negacion-en-javascript/
El truco de la doble negación de Javascript se utiliza para convertir algunos valores como “null”, “undefined”, u objetos a un valor booleano.

 return !!0; //Returns false  
 return !!1; //Returns true  
 return !!window; //Returns true  
 return !!null; //Returns false  
 return !!undefined; //Returns false  
 return !!false; //Returns false  
 return !!true; //Returns true  
 return !!""; //Returns false  
 return !!"Hola Mundo"; //Returns true
La primera negación convierte cualquier dato a booleano. La segunda cambia el valor otra vez al resultado deseado:

Caso False:

Si el valor es null/undefined/false/””/0, la primera negación convierte este valor a true. La segunda negación convierte el valor a falso.

Caso True:

Si el valor es object/true/”Value”/1, entonces la primera negación convierte el valor a falso. La segunda cambia el valor a verdadero.


  */
}