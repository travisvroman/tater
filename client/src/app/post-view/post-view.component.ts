import { Component, OnInit } from "@angular/core";
import { PostService } from "../post.service";
import { TitleService } from "../title.service";
import { ActivatedRoute } from "@angular/router";
import { Post } from "src/post";

/**
 * Component used to view a specific post.
 */
@Component( {
  selector: "app-post-view",
  templateUrl: "./post-view.component.html",
  styleUrls: ["./post-view.component.css"]
} )
export class PostViewComponent implements OnInit {
  private route: ActivatedRoute;
  private postService: PostService;
  private titleService: TitleService;
  /**
   * The post currently being viewed.
   */
  public post: Post;

  /**
   * Creates a new PostViewComponent.
   * @param route The route used for extracting data from the query string.
   * @param postService The post service used by this component.
   * @param titleService The service used to change the page title.
   */
  public constructor( route: ActivatedRoute, postService: PostService, titleService: TitleService ) {
    this.postService = postService;
    this.route = route;
    this.titleService = titleService;
  }

  /**
   * Invoked on initialization.
   */
  public ngOnInit(): void {

    // Subscribe to route parameters and fetch the product based on id
    this.route.paramMap.subscribe( params => {
      const id = params.get( "_id" );
      this.postService.getPostById( id ).subscribe( ( post ) => {
        this.post = post;
        this.titleService.setTitle( post.title + " | TATER" );
      } );
    } );
  }
}
