import { inject, Injectable, signal } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Addcategoryrequest } from '../Models/category.model';
@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor() { }

  private http = inject(HttpClient);
  private baseUrl ='';


  addcategorystatus = signal<'idle'|'loading'|'error'|'success'>('idle');


  addCategory(category:Addcategoryrequest){
    this.addcategorystatus.set('loading');
    this.http.post<void>(`${this.baseUrl}/api.categories`,category).subscribe({
      next:()=>{
        this.addcategorystatus.set('success');
      },
      error:()=>{
        this.addcategorystatus.set('error');
      },
    });
  }
}
