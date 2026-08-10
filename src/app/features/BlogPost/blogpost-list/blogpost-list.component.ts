import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogpostService } from '../Services/blogpost.service';
import { BlogPost, BlogpostV2 } from '../Models/blogpost.model';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent {
/**
 *
 */
  blogPosts: BlogPost[] = [];
  blogpostsv2:BlogpostV2[]=[];
  isLoading: boolean = false;
  errorMessage: string = '';
constructor(private router:Router,
  private blogservice:BlogpostService
) {}

ngOnInit():void{
  //this.getallblogpost();
  this.getallblogpostv2();
}

getallblogpost():void{
  this.isLoading=true;
  this.errorMessage='';
  this.blogservice.getAllblogpost().subscribe({

    next:(response:BlogPost[])=>{
      this.blogPosts=response;
      this.isLoading=false;
    },
    error:(error)=>{
      this.errorMessage=error;
      this.isLoading=false;
    }
  });
}

getallblogpostv2():void{
  this.isLoading=true;
  this.errorMessage='';
  this.blogservice.getallblogpostv2().subscribe({

    next:(response:BlogpostV2[])=>{
      this.blogpostsv2=response;
      this.isLoading=false;
    },
    error:(error)=>{
      this.errorMessage=error;
      this.isLoading=false;
    }
  });
}

navigatetoaddpost():void{
  this.router.navigate(['/admin/blogpost/add']);
}

}
