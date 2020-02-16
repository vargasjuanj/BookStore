import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { BookInterface } from '../../models/book';
import { DataApiService } from '../../services/data-api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
@ViewChild('btnClose',{static:true}) btnClose:ElementRef //similar a $(#close).click() en jquery. btnClose es un alias
//capturamos la referencia #btnClose del html y al alias si queremos le ponemos el mismo nombre. Con id="bntClose"  no funciona
@Input() userUid:string //Eñ paso del listComp el valor de su variable userId a esta variable y luego agregarla en el metodo onSave
  constructor(private dataApiService: DataApiService) { }

  ngOnInit() {
  }
  onSaveBook(bookForm: NgForm): void { //aprovechar el tipado fuerte
    //new 
    if (bookForm.value.id == null) {  //debo asinarle al selectedBook del servicio el id como null porque con undefined falla
     bookForm.value.userUid=this.userUid  //creamos la propiedad userUid y la guardamos para persistirla. La creamos porque no esta contempalada en el objeto any del formulario, pero si en el BookInterface
      this.dataApiService.addBook(bookForm.value)
    //update
    } else { 
      this.dataApiService.updateBook(bookForm.value)
    }
    bookForm.resetForm()
    this.btnClose.nativeElement.click() //El modal se cierra cada vez que se guarda o actualice un libro.






  }

resetForm(bookForm:NgForm){
  bookForm.resetForm()
}
}
