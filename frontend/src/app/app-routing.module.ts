import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "posts", component: PostsComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent},
  {path:"**", redirectTo:""},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
