import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { Post } from "../../post";
import { PostService } from "../post.service";
import { TitleService } from "../title.service";

/**
 * The home page component.
 */
@Component( {
  selector: "app-post-home",
  templateUrl: "./post-home.component.html",
  styleUrls: ["./post-home.component.css"]
} )
export class PostHomeComponent implements OnInit {
  private postService: PostService;
  private titleService: TitleService;

  /**
   * The collection of posts to be shown by this component.
   */
  public posts: Post[];

  /**
   * Creates a new PostHomeComponent.
   * @param postService The post service used by this component.
   * @param titleService The service used to change the page title.
   */
  public constructor( postService: PostService, titleService: TitleService ) {
    this.postService = postService;
    this.titleService = titleService;
  }

  /**
   * Invoked on initialization.
   */
  public ngOnInit(): void {
    this.postService.getAllPosts().subscribe( ( posts: Post[] ) => {
      this.posts = posts;
      this.titleService.setTitle( "Home | TATER" );
    } )
  }
}
