import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { BookInterface } from '../../models/book';
import { ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-details-book',
  templateUrl: './details-book.component.html',
  styleUrls: ['./details-book.component.css']
})
export class DetailsBookComponent implements OnInit {
  public book: BookInterface = {}
  constructor(private DataApiService: DataApiService, private route: ActivatedRoute) { }
//idBook=""
  ngOnInit() {
    //con el params solo me lo devolvia como indefinido, ya que el params se tiene que usar con el subscribe
    const idBook = this.route.snapshot.params['id'] // me ahorro el subscribe y el campo idBook. Snapshot toma una instantanea
/* otra forma 
    this.route.params.subscribe(data=>{
      if(data['id']){
        alert(data['id'])
      this.idBook=data['id']
      }
    })

 //otra forma similar a la anterior

    this.route.params['id'].subscribe(result=>{
      if(result){
        alert(result)
      this.idBook=result
      }
    })
*/
  this.getDetails(idBook)

  }
  getDetails(idBook: string) {
    this.DataApiService.getOneBook(idBook).subscribe(result => {
 this.book=result //El resultado que nos devuelve el observable al subscriptor, el resultado que nos devuelve la api
console.log(this.book)
     } )
    
  }
}
