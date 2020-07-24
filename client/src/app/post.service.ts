import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Post } from "../post";

/**
 * The service used for CRUD operations on posts.
 */
@Injectable( {
  providedIn: "root"
} )
export class PostService {
  private http: HttpClient;

  /**
   * Creates a new PostService.
   * @param http The HTTP client used by this service to create requests top the server.
   */
  public constructor( http: HttpClient ) {
    this.http = http;
  }

  /**
   * Obtains a list of all posts.
   */
  public getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>( "http://localhost:8080/api/posts?title=" );
  }

  /**
   * Obtains a list of all posts which contain the text in title.
   * @param text The text to search for.
   * @returns An Observable with a collection of posts.
   */
  public getAllPostsWithTitle( text: string ): Observable<Post[]> {
    return this.http.get<Post[]>( `http://localhost:8080/api/posts?title=${text}` );
  }

  /**
   * Attempts to get a post by the supplied identifier.
   * @param id The post id to search for.
   * Returns an observable of the post object.
   */
  public getPostById( id: string ): Observable<Post> {
    return this.http.get<Post>( "http://localhost:8080/api/posts/" + id );
  }

  /**
   * Creates a new post with the supplied object.
   * @param post The post to be created.
   */
  public createPost( post: Post ): Observable<Post> {
    return this.http.post<Post>( "http://localhost:8080/api/posts", post );
  }

  /**
   * Updates the given post.
   * @param post The post to be updated.
   */
  public updatePost( post: Post ): Observable<Post> {
    return this.http.put<Post>( "http://localhost:8080/api/posts/" + post._id, post );
  }
}
