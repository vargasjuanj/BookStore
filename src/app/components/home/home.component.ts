import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  books=[]
book=""


  constructor(private dataApi:DataApiService) { }

  ngOnInit() {
   this.dataApi.getAllBooks().subscribe(result=>{this.books=result 
 })

  }


}
