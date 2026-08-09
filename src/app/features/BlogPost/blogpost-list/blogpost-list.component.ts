import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent {
/**
 *
 */
constructor(private router:Router) {

}
navigatetoaddpost():void{
  this.router.navigate(['/admin/blogpost/add']);
}

}
