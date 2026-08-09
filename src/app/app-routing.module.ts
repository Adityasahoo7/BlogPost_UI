import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/Category/category-list/category-list.component';
import { AddCategoryComponent } from './features/Category/add-category/add-category.component';
//import { EditCategoryComponent } from './edit-category/edit-category.component';
import { EditCategoryComponent } from './features/Category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/BlogPost/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/BlogPost/add-blogpost/add-blogpost.component';

const routes: Routes = [
  {path:'admin/categories',
    component:CategoryListComponent
  },
  {path:'admin/categories/add',
    component:AddCategoryComponent
  },
  {
    path:'admin/categories/edit/:id',
    component:EditCategoryComponent
  },
  {
    path:'admin/blogpost',
    component:BlogpostListComponent
  },
  {
    path:'admin/blogpost/add',
    component:AddBlogpostComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
