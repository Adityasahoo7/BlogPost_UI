import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Core/Components/navbar/navbar.component';
import { CategoryListComponent } from './features/Category/category-list/category-list.component';
import { AddCategoryComponent } from './features/Category/add-category/add-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditCategoryComponent } from './features/Category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/BlogPost/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/BlogPost/add-blogpost/add-blogpost.component';
import { CommonModule } from '@angular/common';
  import {MarkdownModule} from 'ngx-markdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditBlogpostComponent } from './features/BlogPost/edit-blogpost/edit-blogpost.component'



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    BlogpostListComponent,
    AddBlogpostComponent,
    EditBlogpostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,

    MarkdownModule.forRoot(),
     BrowserAnimationsModule
  ],
  providers: [
    

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
