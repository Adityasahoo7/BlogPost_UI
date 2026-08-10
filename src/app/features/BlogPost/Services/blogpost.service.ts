import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AddBlogPostRequest, BlogPost, BlogpostV2 } from '../Models/blogpost.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {
private baseUrl = environment.blogpostapiurl;



  constructor(private http:HttpClient) { }

addblogpost(blogpost:AddBlogPostRequest):Observable<any>{
  return this.http.post(`${this.baseUrl}/api/BlogPost/AddBlogpost`,blogpost);
}
getAllblogpost():Observable<BlogPost[]>{
  return this.http.get<BlogPost[]>(`${this.baseUrl}/api/BlogPost/GetAllBlogpost`);
}

getallblogpostv2():Observable<BlogpostV2[]>{
  return this.http.get<BlogpostV2[]>(`${this.baseUrl}/api/BlogPost/GetAllBlogpostV2`)
}
//http://localhost:5086/api/BlogPost/GetAllBlogpost
}
