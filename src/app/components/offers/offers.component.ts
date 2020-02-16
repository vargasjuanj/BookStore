import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  
  books=[]
book=""


  constructor(private dataApi:DataApiService) { }

  ngOnInit() {
   this.dataApi.getAllBooksOffers().subscribe(result=>{this.books=result 
 })

  }

}
