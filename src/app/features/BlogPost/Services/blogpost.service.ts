import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AddBlogPostRequest, BlogPost, BlogpostV2, Category } from '../Models/blogpost.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {
private baseUrl = environment.blogpostapiurl;
private categorybaseurl = environment.categoryapiurl;



  constructor(private http:HttpClient) { }

addblogpost(blogpost:AddBlogPostRequest):Observable<any>{
  return this.http.post(`${this.baseUrl}/api/BlogPost/AddBlogpost`,blogpost, {responseType:'text'});
}
getAllblogpost():Observable<BlogPost[]>{
  return this.http.get<BlogPost[]>(`${this.baseUrl}/api/BlogPost/GetAllBlogpost`);
}

getallblogpostv2():Observable<BlogpostV2[]>{
  return this.http.get<BlogpostV2[]>(`${this.baseUrl}/api/BlogPost/GetAllBlogpostV2`)
}
//http://localhost:5086/api/BlogPost/GetAllBlogpost
getbyidblog(id:string):Observable<BlogPost>{
  return this.http.get<BlogPost>(`${this.baseUrl}/api/BlogPost/BetByIDBlog/${id}`);
}

updateblog(id:string,blogpost:AddBlogPostRequest):Observable<any>{
  return this.http.put(`${this.baseUrl}/api/BlogPost/UpdateBlog/${id}`,blogpost , {responseType:'text'});
}

deleteblog(id:string):Observable<any>{
  return this.http.delete(`${this.baseUrl}/api/BlogPost/DeleteBlog/${id}`, {responseType:'text'});
}

getallcategory():Observable<Category[]>{
return this.http.get<Category[]>(`${this.categorybaseurl}/api/Categories`);
}
}
