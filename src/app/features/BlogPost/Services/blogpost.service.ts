import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AddBlogPostRequest } from '../Models/blogpost.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {
private baseUrl = environment.blogpostapiurl;



  constructor(private http:HttpClient) { }

addblogpost(blogpost:AddBlogPostRequest):Observable<any>{
  return this.http.post(`${this.baseUrl}/api/addblogpost`,blogpost);
}


}
