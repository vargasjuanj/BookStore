import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
import { BookInterface } from 'src/app/models/book';

import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {
  books: BookInterface[]
public isAdmin=null //Es nula porque si la asigno como boolean por defecto va a ser falsa, y si yo pregunto si alguien es admin y hay otros errores va a ser falsa por defecto. Con null tenemos más juego
public userUid=null
  constructor(private dataApiService: DataApiService, private authService:AuthService ) {
    
   }

  ngOnInit() {
    this.getListBooks()
this.currentUser()


  }
  currentUser(){
this.authService.isAuth().subscribe(auth=>{ // recupera el usuario, si lo hay...
  
  if(auth){//Comprobar si el usuario esta logueado
this.authService.isUserAdmin(auth.uid).subscribe( //Lo suscribimos para recuperar el documento
  userRole=>{
  //  console.log('userRole=>',userRole)
    this.isAdmin=userRole.roles.hasOwnProperty('admin')
   //this.isAdmin=Object.assign({},userRole.roles).hasOwnProperty('admin')   //Se verifica si el objeto roles tiene esa propiedad con el método nativo de javascript                                  //Primero nos aseguramos de que tenemos un objeto antes de  y despues comprobamos si en el objeto existe la propiedad admin para ver la lista como admin                    
       //Uno se asegura por si no llega el dato  
   this.userUid=userRole.id
  }
)
  } 
})
  }

  getListBooks() {
    this.dataApiService.getAllBooks().subscribe(
      result => this.books = result //el resultado de la api
    )
  }
  onDeleteBook(idBook: string): void {
    const confirmacion = confirm('Are you sure?');
    if (confirmacion) {
      this.dataApiService.deleteBook(idBook);
    }
  }

  /* https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/assign
   El método Object.assign() se utiliza para copiar los valores de todas la propiedades enumerables de uno o más objetos fuente a 
   un objeto destino. Retorna el objeto destino, un objeto distinto.
   
   */
  onPreUpdateBook(book: BookInterface) {

    this.dataApiService.selectedBook = Object.assign({}, book) //Se filtra el objeto. Esto lo usa domini en el video

  }
  /*ejemplo
  const target = { a: 1, b: 2 };
  const source = { b: 4, c: 5 };
  
  const returnedTarget = Object.assign(target, source);
  
  console.log(target);
  // expected output: Object { a: 1, b: 4, c: 5 }
  
  console.log(returnedTarget);
  // expected output: Object { a: 1, b: 4, c: 5 }
  
  */


  /*   this.dataApiService.selectedBook=book 
   Si utilizo la linea anterior el objeto selectedBook se estaría asignando asi mismo, es una referencia a el mismo.
   Por lo tanto al presionar update se abrira el modal y al completar los datos se cambiria dinamicamente al llenar el input, pero
   se estaria modificando solo en el localStorage, al menos que presione update book y reinicia la pagina para ver los cambios.
  
   */


}
