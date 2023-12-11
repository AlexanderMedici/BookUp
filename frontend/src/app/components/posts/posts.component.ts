import { User } from './../../models/User';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

import { Post } from "src/app/models/Post";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts$!: Observable<Post[]>; 
  userId!: Pick<User, "id">;

  constructor(private postService: PostService, private authService: AuthService) { }
  fetchAll(): Observable<Post[]> { 
    return this.postService.fetchAll();
  }

  ngOnInit() { 
    this.posts$ = this.fetchAll(); 
    this.userId = this.authService.userId();

  }
  createPost():void { 
this.posts$! = this.fetchAll();
  }
  delete(postId: Pick<Post, "id">): void{
    this.postService.delete(postId);
    this.posts$!.fetchAll();
  }
}
