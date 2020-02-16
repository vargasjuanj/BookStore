import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BookInterface } from '../models/book';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  constructor(private afs: AngularFirestore) {
   /*Nota: En el constructor no se hacen operaciones, se hacen separadas en distintos metodos, porque pueden demorar la carga de los libros */
  }
  private booksCollection: AngularFirestoreCollection<BookInterface>
  private books: Observable<BookInterface[]>
  private bookDoc: AngularFirestoreDocument<BookInterface>
  private book: Observable<BookInterface>

  //Para que el formulario guarde un libro completamente en blanco inicializo las variables, después hago las respectivas validaciones.
public selectedBook:BookInterface={
  id:null,//El id se coloca como null porque al ocuparlo en el metodo onSaveBook del modal da error.
titulo:'',
idioma:'',
precio:'',
autor:'',
oferta:'',
portada:'',
link_amazon:'',
descripcion:''
  }
  
 
//El valuechanges devuelve datos y el snapshops recupera metadatos, en este metodos aparte de los datos recuperados recuperamos metadatos
  getAllBooks() {
  this.booksCollection = this.afs.collection<BookInterface>('books')
    this.books = this.booksCollection.valueChanges({ idField: 'id' }) //https://github.com/angular/angularfire/pull/1976
    return this.books;
//Recuperamos el matadato del id directamente al ponerle un parametro al valuechanges, en vez de hacerlos más dificil
  }
  getAllBooksOffers() {
    this.booksCollection = this.afs.collection<BookInterface>('books',ref=>ref.where('oferta','==','1'))  //ese where es un query, trae de la bd solo aquellos libros que tengan la propiedad igual a 1
    this.books = this.booksCollection.valueChanges({ idField: 'id' }) 
    return this.books;

  
  }


getOneBook(idBook:string){

  this.bookDoc=this.afs.doc<BookInterface>(`books/${idBook}`)
 return this.book=this.bookDoc.snapshotChanges().pipe(
    map(action=>{
      if(action.payload.exists===false){
        alert('error, id not found')
        return null;

      }else{
        const data=action.payload.data() as BookInterface
        data.id=action.payload.id
      alert(data.id)
        return data
      }
    })
  )
}
addBook(book:BookInterface) {
  this.booksCollection.add(book)
 }

updateBook(book:BookInterface) {
let idBook=book.id
//filtra el documento por el id del libro y luego lo actualiza
this.bookDoc=this.afs.doc<BookInterface>(`books/${idBook}`)
this.bookDoc.update(book)

 }
deleteBook(idBook:string) {
  //Filtra el documento por el id del libro
  this.bookDoc=this.afs.doc<BookInterface>(`books/${idBook}`);
  //y luego de filtrarlo lo elimina
  this.bookDoc.delete().then(()=>
  alert('It was successfully deleted!'),
  err=>alert('Error deleting book'))
 }

}
