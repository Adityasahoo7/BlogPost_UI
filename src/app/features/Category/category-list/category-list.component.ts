import { Component, inject } from '@angular/core';
import { CategoryServiceService } from '../Services/category-service.service';
import { getallCategory } from '../Models/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {

  categorylist:getallCategory[]=[];
  isLoading = false;
  errormessage='';
  constructor(private categoryservice:CategoryServiceService){

  }
ngOnInit():void{
  this.getallcategory();
}
  getallcategory():void{

    this.isLoading=true;
    this.errormessage='';
    this.categoryservice.getallCategory().subscribe({
      next:(response:getallCategory[])=>{
        this.categorylist=response;
        this.isLoading=false;
      },
      error:(error)=>{
        this.isLoading=true;
        this.errormessage='Unable to Load Category List'
      }
    });
  }
 
}
