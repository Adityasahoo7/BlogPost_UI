import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/Category/category-list/category-list.component';
import { AddCategoryComponent } from './features/Category/add-category/add-category.component';
import { EditCategoryComponent } from './features/Category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/BlogPost/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/BlogPost/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './features/BlogPost/edit-blogpost/edit-blogpost.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';
import { AuthGuard } from './Auth/Guards/auth.guard';
import { LoginComponent } from './Auth/Components/login/login.component';
import { RegisterComponent } from './Auth/Components/register/register.component';

const routes: Routes = [
   // Application opens -> Login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },


  // Login
  {
    path: 'login',
    component: LoginComponent
  },


  // Register
  {
    path: 'register',
    component: RegisterComponent
  },


  { path: 'home', component: HomeComponent,   canActivate: [AuthGuard] },
  { path: 'blog/:id', component: BlogDetailsComponent },

  { path: 'admin/categories', component: CategoryListComponent },
  { path: 'admin/categories/add', component: AddCategoryComponent },
  { path: 'admin/categories/edit/:id', component: EditCategoryComponent },
  { path: 'admin/blogpost', component: BlogpostListComponent },
  { path: 'admin/blogpost/add', component: AddBlogpostComponent },
  { path: 'admin/blogpost/editblog/:id', component: EditBlogpostComponent },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }