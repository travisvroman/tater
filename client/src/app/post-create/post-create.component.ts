import { Component, OnInit, Input } from "@angular/core";
import { PostService } from "../post.service";
import { Location } from "@angular/common";
import { Post } from "src/post";

/**
 * Component used for creating new posts.
 */
@Component( {
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
} )
export class PostCreateComponent implements OnInit {

  private postService: PostService;
  private location: Location;

  /**
   * Post object used for input binding.
   */
  @Input()
  public post: Post;

  /**
   * Creates a new PostCreateComponent.
   * @param postService The post service to be used.
   * @param location The location of this page.
   */
  public constructor( postService: PostService, location: Location ) {
    this.postService = postService;
    this.location = location;

    // Blank object for binding.
    this.post = {
      _id: undefined,
      title: "",
      content: "",
      published: false
    };
  }

  /**
   * Invoked on initialization.
   */
  public ngOnInit(): void { }

  /**
   * Go back to the previous page.
   */
  public goBack(): void {
    this.location.back();
  }

  /**
   * Invoked when the form is submitted. Copies post to
   * post service and navigates the page back to where it was before.
   */
  public onSubmit(): void {
    this.postService.createPost( this.post );
    this.goBack();
  }
}
