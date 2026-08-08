import { inject, Injectable, signal } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { Addcategoryrequest, getallCategory } from '../Models/category.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor() { }

  private http = inject(HttpClient);
 // private baseUrl ='http://localhost:5086';

 private baseUrl= environment.categoryapiurl;
  // http://localhost:5086/api/Categories

  addcategorystatus = signal<'idle'|'loading'|'error'|'success'>('idle');


  addCategory(category:Addcategoryrequest){
    this.addcategorystatus.set('loading');
    this.http.post<void>(`${this.baseUrl}/api/Categories`,category).subscribe({
      next:()=>{
        this.addcategorystatus.set('success');
      },
      error:(error)=>{
        console.log(error);
        this.addcategorystatus.set('error');
      },
    });
  }

  getallCategory():Observable<getallCategory[]>{

    return this.http.get<getallCategory[]>(`${this.baseUrl}/api/Categories`);
  }

getCategoryById(id: string) {
  return this.http.get<any>(
    `${this.baseUrl}/api/Categories/${id}`
  );
}

updateCategory(id: string, category: any) {
  return this.http.put(
    `${this.baseUrl}/api/Categories/UpdateCategory/${id}`,
    category,{ responseType: 'text' }
  );
}

deleteCategory(id: string) {
    return this.http.delete(
        `${this.baseUrl}/api/Categories/Deletecategory/${id}`,{ responseType: 'text' }
    );
}
}
