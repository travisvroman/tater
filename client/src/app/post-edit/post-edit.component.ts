import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Location } from '@angular/common'
import { Post } from 'src/post';
import { ActivatedRoute } from '@angular/router';

/**
 * Component used for editing existing posts.
 */
@Component( {
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
} )
export class PostEditComponent implements OnInit {

  private postService: PostService;
  private location: Location;
  private route: ActivatedRoute;

  /**
   * Object used for input binding.
   */
  public post: Post;

  /**
   * Creates a new PostEditComponent.
   * 
   * @param route Route, used to extract id from query string.
   * @param postService The post service used by this component.
   * @param location The location of this page.
   */
  public constructor( route: ActivatedRoute, postService: PostService, location: Location ) {
    this.postService = postService;
    this.location = location;
    this.route = route;
  }

  /**
   * Invoked on initialization.
   */
  public ngOnInit(): void {
    // Subscribe to route parameters and fetch the product based on id
    this.route.paramMap.subscribe( params => {
      let id = params.get( "_id" );
      this.postService.getPostById( id ).subscribe( ( post ) => {
        this.post = post;
      } );
    } );
  }

  /**
   * Navigates to the previous page.
   */
  public goBack() {
    this.location.back();
  }

  /**
   * Invoked on form submission.
   */
  public onSubmit() {
    this.postService.updatePost( this.post );
    this.goBack();
  }
}
